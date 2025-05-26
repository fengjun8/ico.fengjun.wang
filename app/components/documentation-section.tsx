import { InfoIcon, HelpCircleIcon, CheckCircleIcon, FileTypeIcon, RulerIcon } from "lucide-react"

export default function DocumentationSection() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <InfoIcon className="mr-2 text-red-500 flex-shrink-0" size={24} />
          什么是Favicon？
        </h2>
        <p>
          Favicon（favorite icon的缩写）是一个在浏览器标签页、书签和其他界面元素中显示的小图标。
          它帮助用户在多个打开的标签页和书签中快速识别您的网站。
        </p>

        <h3 className="text-xl font-bold mt-6 mb-4 flex items-center">
          <HelpCircleIcon className="mr-2 text-red-500 flex-shrink-0" size={20} />
          如何使用Favicon
        </h3>
        <p>要将Favicon添加到您的网站，您需要：</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>使用我们的转换工具将图片转换为ICO格式</li>
          <li>将图标文件命名为"favicon.ico"</li>
          <li>将文件放在网站的根目录中</li>
          <li>在网站的&lt;head&gt;部分添加以下HTML代码：</li>
        </ol>

        <div className="mt-4 relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono">{`<link rel="icon" href="/favicon.ico" sizes="any" />`}</code>
          </pre>
          <div className="absolute top-3 right-3 text-xs text-gray-400">HTML</div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-4 flex items-center">
          <CheckCircleIcon className="mr-2 text-red-500 flex-shrink-0" size={20} />
          最佳实践
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>使用简单、易识别的设计，确保在小尺寸下效果良好</li>
          <li>创建多个尺寸（16x16、32x32）以适应不同设备的显示需求</li>
          <li>确保您的favicon具有良好的对比度和可读性</li>
          <li>在不同浏览器和设备上测试您的favicon</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-4 flex items-center">
          <FileTypeIcon className="mr-2 text-red-500 flex-shrink-0" size={20} />
          支持的格式
        </h3>
        <p>我们的转换工具支持以下输入格式：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>JPEG（.jpg、.jpeg）</li>
          <li>PNG（.png）</li>
          <li>GIF（.gif）</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-4 flex items-center">
          <RulerIcon className="mr-2 text-red-500 flex-shrink-0" size={20} />
          尺寸指南
        </h3>
        <p>我们支持转换为以下ICO尺寸：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>16x16 - 大多数浏览器的标准favicon尺寸</li>
          <li>32x32 - 现代浏览器的增强细节版本</li>
          <li>48x48 - Windows任务栏图标</li>
          <li>64x64 - 高分辨率显示器</li>
          <li>128x128 - 大图标格式</li>
        </ul>
      </div>
    </div>
  )
}
