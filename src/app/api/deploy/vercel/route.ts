import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { projectName } = await req.json();

    if (!projectName) {
      return NextResponse.json(
        { success: false, error: "Project name is required." },
        { status: 400 }
      );
    }

    // Placeholder for future Vercel deployment API integration
    // You can insert real deploy logic here later.
    return NextResponse.json(
      {
        success: true,
        message: `Deployment request for "${projectName}" received.`,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Deployment failed." },
      { status: 500 }
    );
  }
}
