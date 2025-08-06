"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export interface Tool {
  id: string
  url: string
  category: string
  anchors: string[]
}

interface RelatedToolsProps {
  category?: string
  maxTools?: number
  className?: string
}

// 简单的伪随机函数，基于字符串生成固定的"随机"数
const seededRandom = (seed: string): number => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  return Math.abs(hash) / 2147483647 // 归一化到0-1
}

// 获取相关工具的逻辑 - 使用固定种子确保稳定排序
const getRelatedTools = (allTools: Tool[], currentCategory: string = 'common', targetCount: number = 30): Tool[] => {
  // 首先获取common分类的工具（始终显示）
  const commonTools = allTools.filter(tool => tool.category === 'common')
  
  // 如果当前分类不是common，获取同类别的工具
  let sameCategory: Tool[] = []
  if (currentCategory !== 'common') {
    sameCategory = allTools.filter(tool => tool.category === currentCategory)
  }
  
  // 合并common工具和同类别工具
  const priorityTools = [...commonTools, ...sameCategory]
  
  // 如果优先工具不够30个，获取其他工具补充（使用固定排序）
  if (priorityTools.length < targetCount) {
    const otherTools = allTools.filter(tool => 
      tool.category !== 'common' && tool.category !== currentCategory
    )
    // 使用工具ID作为种子进行稳定的"随机"排序
    const shuffledOthers = [...otherTools].sort((a, b) => {
      const seedA = seededRandom(a.id + currentCategory)
      const seedB = seededRandom(b.id + currentCategory)
      return seedA - seedB
    })
    const needed = targetCount - priorityTools.length
    const additional = shuffledOthers.slice(0, needed)
    
    return [...priorityTools, ...additional]
  }
  
  // 如果优先工具超过30个，选择前30个（保持稳定顺序）
  if (priorityTools.length > targetCount) {
    return priorityTools.slice(0, targetCount)
  }
  
  return priorityTools
}

// 基于工具ID生成固定的深色颜色
const getToolColor = (toolId: string): string => {
  const colors = [
    '#1f2937', '#dc2626', '#ea580c', '#d97706', '#65a30d', '#16a34a',
    '#059669', '#0891b2', '#0284c7', '#2563eb', '#7c3aed', '#9333ea',
    '#c026d3', '#e11d48', '#be123c', '#a21caf', '#7e22ce', '#6366f1',
    '#3b82f6', '#06b6d4', '#10b981', '#84cc16', '#eab308', '#f59e0b',
    '#f97316', '#ef4444'
  ]
  const index = Math.floor(seededRandom(toolId) * colors.length)
  return colors[index]
}

// 基于工具ID生成固定的字体大小 (13px-35px)
const getToolFontSize = (toolId: string): number => {
  const minSize = 13
  const maxSize = 35
  const range = maxSize - minSize + 1
  return Math.floor(seededRandom(toolId + 'font') * range) + minSize
}

// 获取工具的显示名称（优先中文）
const getToolDisplayName = (tool: Tool): string => {
  const chineseName = tool.anchors.find(anchor => /[\u4e00-\u9fa5]/.test(anchor))
  return chineseName || tool.anchors[0] || tool.id
}

export default function RelatedTools({ 
  category = 'common', 
  maxTools = 30, 
  className = '' 
}: RelatedToolsProps) {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('https://cdn.fengjun.wang/common/tools-data.json')
        const data = await response.json()
        setTools(data.tools || [])
      } catch (error) {
        console.error('Failed to fetch tools data:', error)
        setTools([])
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  const relatedTools = getRelatedTools(tools, category, maxTools)

  if (loading) {
    return (
      <Card className={`border border-gray-200 bg-white ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              相关工具推荐
            </h2>
          </div>
          <div className="text-center text-gray-500">
            加载中...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (relatedTools.length === 0) {
    return null
  }

  return (
    <Card className={`border border-gray-200 bg-white ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            相关工具推荐
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 justify-start items-center">
          {relatedTools.map((tool) => {
            const color = getToolColor(tool.id)
            const fontSize = getToolFontSize(tool.id)
            
            return (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center px-3 py-1 rounded-lg hover:bg-gray-50 transition-all duration-200"
                style={{
                  color: color,
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.1',
                  textDecoration: 'none'
                }}
              >
                {getToolDisplayName(tool)}
              </a>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}