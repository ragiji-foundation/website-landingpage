import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
  try {
    const { id } = await context;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/gallery/${id}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return NextResponse.json(response.data);

  } catch (error) {
    console.error('Gallery item fetch error:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return NextResponse.json(
          { error: 'Gallery item not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to fetch gallery item' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
  try {
    const { id } = await context;

    await axios.delete(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/gallery/${id}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });

  } catch (error) {
    console.error('Gallery item deletion error:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return NextResponse.json(
          { error: 'Gallery item not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to delete gallery item' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
