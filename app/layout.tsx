import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "在线制作ico图标 | 在线ico图标转换工具 方便制作favicon.ico",
  description:
    "轻松制作ico图标,在线ico图标转换工具,可以将jpg、jpeg、gif、png等图像转换成ico图像,方便浏览器制作并生成favicon.ico图标,提供ico图标下载,png to ico,jpg to ico,gif to ico",
  keywords: "ico图标,icon图标,图标ico,favicon,ico,在线favicon.ico生成,favicon制作工具,转换jpg,转换png,转换gif",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
