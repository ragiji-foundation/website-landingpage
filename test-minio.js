const { config } = require('dotenv');
const { Client } = require('minio');

// Load environment variables
config();

// Create MinIO client directly for testing
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || '147.93.153.51',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'ragijifoundation',
  secretKey: process.env.MINIO_SECRET_KEY || 'ragijianeesh123',
});

async function testMinioConnection() {
  try {
    console.log('🔍 Testing MinIO connection with credentials...');
    console.log(`📡 Server: ${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`);
    console.log(`🔑 Access Key: ${process.env.MINIO_ACCESS_KEY}`);
    console.log(`🔒 SSL: ${process.env.MINIO_USE_SSL}`);
    
    // Test 1: List buckets
    console.log('\n🪣 Testing bucket access...');
    const buckets = await minioClient.listBuckets();
    console.log('✅ Buckets found:', buckets.map(b => b.name).join(', '));
    
    // Test 2: Check if a specific object exists
    const testBucket = 'ragiji-images';
    const testObject = '1753809733892-FCF34AB9-5088-4FDB-8C36-6FFCDCCE9A1D.JPG';
    
    console.log(`\n🔍 Testing object existence: ${testBucket}/${testObject}`);
    try {
      await minioClient.statObject(testBucket, testObject);
      console.log('✅ Object exists');
      
      // Test 3: Try to get object stream
      console.log('\n📥 Testing object stream...');
      const stream = await minioClient.getObject(testBucket, testObject);
      console.log('✅ Successfully got object stream');
      
      // Count bytes to verify we can read the stream
      let byteCount = 0;
      for await (const chunk of stream) {
        byteCount += chunk.length;
        if (byteCount > 1000) break; // Just test first 1KB
      }
      console.log(`✅ Read ${byteCount} bytes from stream`);
    } catch (objectError) {
      console.log('❌ Object not found or access denied:', objectError.message);
    }
    
    console.log('\n🎉 MinIO connection test successful!');
    
  } catch (error) {
    console.error('❌ MinIO connection test failed:', error);
    
    if (error && typeof error === 'object' && 'code' in error) {
      switch (error.code) {
        case 'ECONNREFUSED':
          console.log('💡 Tip: Make sure MinIO server is running');
          break;
        case 'AccessDenied':
          console.log('💡 Tip: Check MinIO credentials');
          break;
        case 'InvalidAccessKeyId':
          console.log('💡 Tip: Access key is incorrect');
          break;
        case 'SignatureDoesNotMatch':
          console.log('💡 Tip: Secret key is incorrect');
          break;
        default:
          console.log(`💡 Error code: ${error.code}`);
      }
    }
  }
}

// Run the test
testMinioConnection();
