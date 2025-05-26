"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCwIcon as ReloadIcon, Upload } from "lucide-react"
import { toast } from "sonner"

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif"]
const ICON_SIZES = ["16x16", "32x32", "48x48", "64x64", "128x128"]

export default function ConvertSection() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [size, setSize] = useState("32x32")
  const [captcha, setCaptcha] = useState("")
  const [captchaImage, setCaptchaImage] = useState("")
  const [captchaCode, setCaptchaCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  // 生成4位数字验证码
  const generateCaptcha = useCallback(() => {
    try {
      const code = Math.floor(1000 + Math.random() * 9000).toString()
      setCaptchaCode(code)

      // 创建验证码图片
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        console.error("无法创建Canvas上下文")
        return
      }

      canvas.width = 100
      canvas.height = 40

      // 背景
      ctx.fillStyle = "#f3f4f6"
      ctx.fillRect(0, 0, 100, 40)

      // 添加干扰线
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        ctx.beginPath()
        ctx.moveTo(Math.random() * 100, Math.random() * 40)
        ctx.lineTo(Math.random() * 100, Math.random() * 40)
        ctx.stroke()
      }

      // 添加干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        ctx.beginPath()
        ctx.arc(Math.random() * 100, Math.random() * 40, 1, 0, 2 * Math.PI)
        ctx.fill()
      }

      // 文字
      ctx.fillStyle = "#000"
      ctx.font = "bold 24px Arial"
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"
      for (let i = 0; i < code.length; i++) {
        const rotation = (Math.random() - 0.5) * 0.3
        ctx.save()
        ctx.translate(20 + i * 20, 20)
        ctx.rotate(rotation)
        ctx.fillText(code[i], 0, 0)
        ctx.restore()
      }

      setCaptchaImage(canvas.toDataURL())
    } catch (error) {
      console.error("生成验证码错误:", error)
      // 提供一个回退方案
      setCaptchaCode("1234")
      setCaptchaImage("/placeholder.svg")
    }
  }, [])

  useEffect(() => {
    try {
      generateCaptcha()
    } catch (error) {
      console.error("初始化验证码错误:", error)
    }
  }, [generateCaptcha])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = e.target.files?.[0]
      if (!selectedFile) return

      if (!SUPPORTED_FORMATS.includes(selectedFile.type)) {
        setError("请上传有效的图片文件（JPEG、PNG或GIF）")
        setFile(null)
        setPreview(null)
        return
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("文件大小不能超过5MB")
        setFile(null)
        setPreview(null)
        return
      }

      setError(null)
      setDebugInfo(null)
      setFile(selectedFile)

      // 创建预览
      const reader = new FileReader()
      reader.onload = () => {
        try {
          if (reader.result) {
            setPreview(reader.result as string)
          }
        } catch (error) {
          console.error("设置预览错误:", error)
          setPreview(null)
        }
      }
      reader.onerror = () => {
        console.error("读取文件错误")
        setPreview(null)
      }
      reader.readAsDataURL(selectedFile)
    } catch (error) {
      console.error("文件处理错误:", error)
      setError("文件处理错误，请重试")
    }
  }

  // 在客户端调整图像尺寸
  const resizeImage = (file: File, targetWidth: number, targetHeight: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        // 创建一个FileReader来读取文件
        const reader = new FileReader()

        // 使用function关键字定义回调，避免this绑定问题
        reader.onload = () => {
          try {
            if (!reader.result) {
              reject(new Error("文件读取结果为空"))
              return
            }

            // 创建一个图像对象
            const img = new Image()

            // 使用function关键字定义回调
            img.onload = () => {
              try {
                // 创建Canvas元素
                const canvas = document.createElement("canvas")
                canvas.width = targetWidth
                canvas.height = targetHeight
                const ctx = canvas.getContext("2d")

                if (!ctx) {
                  reject(new Error("无法创建Canvas上下文"))
                  return
                }

                // 绘制调整大小后的图像
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

                // 将Canvas转换为Blob
                canvas.toBlob((blob) => {
                  if (blob) {
                    resolve(blob)
                  } else {
                    reject(new Error("无法创建图像Blob"))
                  }
                }, "image/png")
              } catch (error) {
                console.error("Canvas处理错误:", error)
                reject(error)
              }
            }

            // 使用function关键字定义回调
            img.onerror = () => {
              console.error("图像加载错误")
              reject(new Error("图像加载失败"))
            }

            // 设置图像源
            img.src = reader.result as string
          } catch (error) {
            console.error("图像创建错误:", error)
            reject(error)
          }
        }

        // 使用function关键字定义回调
        reader.onerror = () => {
          console.error("文件读取错误")
          reject(new Error("文件读取失败"))
        }

        // 读取文件为DataURL
        reader.readAsDataURL(file)
      } catch (error) {
        console.error("resizeImage总体错误:", error)
        reject(error)
      }
    })
  }

  // 使用客户端处理和服务器端API转换为ICO
  const handleConvert = async () => {
    // 基本验证
    if (!file) {
      setError("请先上传图片")
      return
    }

    if (!captcha) {
      setError("请输入验证码")
      return
    }

    if (captcha !== captchaCode) {
      setError("验证码错误")
      generateCaptcha()
      setCaptcha("")
      return
    }

    setIsConverting(true)
    setError(null)
    setDebugInfo(null)

    try {
      // 解析尺寸
      const [width, height] = size.split("x").map(Number)

      // 在客户端调整图像尺寸
      console.log(`调整图像尺寸为 ${width}x${height}...`)
      const resizedImageBlob = await resizeImage(file, width, height)
      console.log("图像调整完成，大小:", resizedImageBlob.size)

      // 创建一个新的FormData对象
      const formData = new FormData()
      formData.append("file", new File([resizedImageBlob], "resized-image.png", { type: "image/png" }))
      formData.append("size", size)

      // 发送请求到服务器
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      })

      // 记录响应信息用于调试
      const responseInfo = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      }

      console.log("API Response Info:", responseInfo)

      // 检查响应状态
      if (!response.ok) {
        let errorMessage = "服务器处理失败"

        try {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json()
            console.error("JSON Error Data:", errorData)
            errorMessage = errorData.error || errorMessage
          } else {
            const errorText = await response.text()
            console.error("Text Error Data:", errorText)
            errorMessage = errorText || errorMessage
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError)
          errorMessage = `解析响应失败: ${parseError}`
        }

        throw new Error(errorMessage)
      }

      // 获取响应数据
      const blob = await response.blob()
      console.log("Blob info:", {
        size: blob.size,
        type: blob.type,
      })

      // 检查blob是否为空
      if (blob.size === 0) {
        throw new Error("生成的图标为空，请重试")
      }

      // 创建下载链接
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "favicon.ico"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // 释放URL对象
      URL.revokeObjectURL(url)

      // 重置状态
      setCaptcha("")
      generateCaptcha()
      toast.success("转换成功！")
    } catch (error: any) {
      console.error("转换错误:", error)

      // 详细记录错误信息
      const errorDetails = {
        message: error?.message || "未知错误",
        stack: error?.stack,
        toString: error?.toString(),
        name: error?.name,
        constructor: error?.constructor?.name,
      }

      console.error("Error details:", errorDetails)
      setDebugInfo(JSON.stringify(errorDetails, null, 2))

      // 设置用户友好的错误消息
      setError(error?.message || "转换失败，请重试")
      toast.error(error?.message || "转换失败，请重试")
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="grid gap-6">
      {/* 文件上传 */}
      <div className="grid gap-4">
        <Label>上传图片</Label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">拖拽文件到此处或点击上传</span>
            <span className="text-xs text-muted-foreground">支持的格式：JPEG、PNG、GIF（最大5MB）</span>
          </Label>
        </div>
      </div>

      {/* 预览 */}
      {preview && (
        <div className="grid gap-2">
          <Label>预览</Label>
          <div className="border rounded-lg p-4 flex items-center justify-center bg-gray-50">
            {/* 使用普通img标签替代Next.js的Image组件 */}
            <img
              src={preview || "/placeholder.svg"}
              alt="预览"
              style={{ maxWidth: "128px", maxHeight: "128px", objectFit: "contain" }}
            />
          </div>
        </div>
      )}

      {/* 尺寸选择 */}
      <div className="grid gap-4">
        <Label>图标尺寸</Label>
        <RadioGroup
          value={size}
          onValueChange={setSize}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {ICON_SIZES.map((iconSize) => (
            <div key={iconSize} className="flex items-center space-x-2">
              <RadioGroupItem value={iconSize} id={iconSize} />
              <Label htmlFor={iconSize}>{iconSize}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* 验证码 */}
      <div className="grid gap-4">
        <Label htmlFor="captcha">验证码</Label>
        <div className="flex gap-4">
          <Input
            id="captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            placeholder="请输入4位数字验证码"
            maxLength={4}
            className="flex-1"
          />
          <div className="flex gap-2">
            <img
              src={captchaImage || "/placeholder.svg"}
              alt="验证码"
              className="h-10 rounded cursor-pointer"
              onClick={generateCaptcha}
            />
            <Button variant="outline" size="icon" onClick={generateCaptcha} className="h-10 w-10">
              <ReloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 错误信息 */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 调试信息 */}
      {debugInfo && (
        <Alert className="bg-gray-100 border-gray-300">
          <details>
            <summary className="cursor-pointer font-medium">调试信息（点击展开）</summary>
            <pre className="mt-2 text-xs overflow-auto max-h-40">{debugInfo}</pre>
          </details>
        </Alert>
      )}

      {/* 转换按钮 */}
      <Button onClick={handleConvert} disabled={!file || !captcha || isConverting} className="w-full">
        {isConverting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {isConverting ? "转换中..." : "转换为ICO"}
      </Button>
    </div>
  )
}

