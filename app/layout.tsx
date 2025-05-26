import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Favicon.ico图标在线制作-png转ico-在线ico图标转换工具 方便制作favicon.ico",
  description:
    "轻松制作ico图标,在线ico图标转换工具,可以将jpg、jpeg、gif、png等图像转换成ico图像,方便浏览器制作并生成favicon.ico图标,提供ico图标下载,png to ico,jpg to ico,gif to ico",
  keywords: "ico图标,icon图标,图标ico,favicon,ico,在线favicon.ico生成,favicon制作工具,转换jpg,转换png,转换gif",
  icons: {
    icon: "/favicon.ico",
  },
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
        <Script strategy="afterInteractive" id="baidu-analytics">
          {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?1ed1451775a140fc3f977bec4298364e";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
