import cloudinary from '@/lib/cloudinary';

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const videoFile = formData.get('video');
    const title = formData.get('title'); // Extract the title from FormData

    if (!videoFile || !title) {
      return new Response(JSON.stringify({ success: false, message: 'Video file and title are required' }), { status: 400 });
    }

    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());

    const uploadResponse = await cloudinary.uploader.upload_stream({
      resource_type: 'video',
      folder: 'nextjs_videos',
      public_id: title, // Use title as the public ID
      context: { title }, // Store the title in the context metadata
    }, (error, result) => {
      if (error) {
        throw error;
      } else {
        return result;
      }
    }).end(videoBuffer);

    return new Response(JSON.stringify({ success: true, data: uploadResponse }), { status: 200 });
  } catch (error) {
    console.error('Error during upload:', error);
    return new Response(JSON.stringify({ success: false, message: 'Upload failed', error: error.message }), { status: 500 });
  }
};