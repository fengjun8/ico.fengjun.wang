"use client"

import ConvertSection from "./components/convert-section"
import DocumentationSection from "./components/documentation-section"
import RelatedTools from "@/components/related-tools"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronUp, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // 监听滚动事件，决定是否显示返回顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 返回顶部功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 max-w-[1000px]">
          <h1 className="text-2xl font-bold flex items-center">
            <ImageIcon className="mr-2 text-red-500" size={24} />
            在线制作ICO图标
          </h1>
          <p className="text-muted-foreground">将您的图片在线转换为ICO格式图标</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-[1000px]">
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <ConvertSection />
            </div>
          </div>

          <DocumentationSection />
          
          <RelatedTools 
            category="common" 
            maxTools={30} 
            className="mt-8" 
          />
        </div>
      </main>

      <footer className="border-t bg-white mt-8 relative">
        <div className="container mx-auto px-4 py-4 max-w-[1000px]">
          <div className="text-sm text-muted-foreground text-center">
            <p>
              © {new Date().getFullYear()}{" "}
              <Link href="/" className="hover:underline">
                在线制作ICO图标
              </Link>
              . 保留所有权利.{" "}
              <a
                href="http://beian.miit.gov.cn/"
                rel="noreferrer external nofollow"
                target="_blank"
                className="hover:underline"
              >
                粤ICP备2022149896号
              </a>{" "}
              <Link href="https://www.fengjun.wang/about" className="hover:underline">
                关于我们
              </Link>
            </p>
          </div>

          {/* 返回顶部按钮 */}
          {showScrollTop && (
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-8 right-8 rounded-full shadow-md hover:shadow-lg z-50 bg-red-500 text-white hover:bg-red-600 border-none"
              onClick={scrollToTop}
              aria-label="返回顶部"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}
