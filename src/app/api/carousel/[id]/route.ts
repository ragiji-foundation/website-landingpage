import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/carousel/${id}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return NextResponse.json(response.data);

  } catch (error) {
    console.error('Carousel item fetch error:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return NextResponse.json(
          { error: 'Carousel item not found' },
          { status: 404 }
        );
      }
      // ...existing error handling...
    }
    // ...existing error handling...
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    await axios.delete(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/carousel/${id}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Carousel item deleted successfully'
    });

  } catch (error) {
    // ...existing error handling...
  }
}
