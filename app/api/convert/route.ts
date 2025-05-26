import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log("API route called: /api/convert")

  try {
    // 解析表单数据
    const formData = await request.formData()
    console.log("FormData received")

    const file = formData.get("file") as File | null
    const size = (formData.get("size") as string) || "32x32"

    console.log("Received parameters:", {
      fileExists: !!file,
      fileType: file?.type,
      fileSize: file?.size,
      size,
    })

    if (!file) {
      console.error("No file provided")
      return NextResponse.json({ error: "请上传文件" }, { status: 400 })
    }

    // 获取文件数据
    console.log("Reading file buffer...")
    const fileBuffer = await file.arrayBuffer()
    console.log("File buffer read, size:", fileBuffer.byteLength)

    // 直接返回客户端处理后的图像
    console.log("Returning processed image...")
    return new NextResponse(Buffer.from(fileBuffer), {
      headers: {
        "Content-Type": "image/x-icon",
        "Content-Disposition": `attachment; filename="favicon.ico"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Server error:", error)

    // 确保返回一个有效的JSON响应
    return NextResponse.json(
      {
        error: "图片处理失败，请确保上传了有效的图片文件",
        details: error.message || "未知错误",
      },
      { status: 500 },
    )
  }
}

