import { NextRequest, NextResponse } from 'next/server';
import { getMinioObjectStream, objectExists } from '@/lib/minio';

/**
 * Image proxy to serve MinIO images through HTTPS
 * This uses MinIO client with authentication to serve images securely
 */
export async function GET(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    // Extract the image path from the URL
    const imagePath = pathname.replace('/api/image-proxy/', '');
    
    if (!imagePath) {
      return NextResponse.json({ error: 'Image path required' }, { status: 400 });
    }

    // Parse bucket and object name from path
    const pathParts = imagePath.split('/');
    if (pathParts.length < 2) {
      return NextResponse.json({ error: 'Invalid image path format' }, { status: 400 });
    }
    
    const bucketName = pathParts[0];
    const objectName = decodeURIComponent(pathParts.slice(1).join('/')); // Decode URL-encoded characters
    
    console.log('Image proxy request:', {
      imagePath,
      bucketName,
      objectName,
      originalObjectName: pathParts.slice(1).join('/')
    });

    // Check if object exists first
    const exists = await objectExists(bucketName, objectName);
    if (!exists) {
      console.error('Object not found:', `${bucketName}/${objectName}`);
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Get the object stream from MinIO using authenticated client
    const stream = await getMinioObjectStream(bucketName, objectName);
    
    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }
    const imageBuffer = Buffer.concat(chunks);

    // Determine content type based on file extension
    const extension = objectName.split('.').pop()?.toLowerCase();
    let contentType = 'image/jpeg'; // Default
    
    switch (extension) {
      case 'png':
        contentType = 'image/png';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
      case 'jpg':
      case 'jpeg':
      default:
        contentType = 'image/jpeg';
        break;
    }

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    
    // Check if it's a MinIO-specific error
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'NoSuchKey' || error.code === 'NotFound') {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
      }
      if (error.code === 'AccessDenied') {
        return NextResponse.json({ error: 'Access denied to image' }, { status: 403 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Failed to proxy image',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
