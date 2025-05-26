import ConvertSection from "./components/convert-section"
import DocumentationSection from "./components/documentation-section"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">在线制作ICO图标</h1>
          <p className="text-muted-foreground">将您的图片在线转换为ICO格式图标</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <ConvertSection />
            </div>
          </div>

          <DocumentationSection />
        </div>
      </main>

      <footer className="border-t bg-white mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:underline">
              在线制作ICO图标
            </Link>
            . 保留所有权利.
          </p>
        </div>
      </footer>
    </div>
  )
}
