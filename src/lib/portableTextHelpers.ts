// Helper functions for PortableText
import { toHTML } from '@portabletext/to-html'

// Convert PortableText to HTML string with formatting preserved
export function portableTextToHTML(portableText: any[]): string {
  if (!portableText || !Array.isArray(portableText)) {
    return ''
  }
  
  const components = {
    block: {
      normal: ({ children }: { children: string }) => children, // Remove <p> wrapper for titles
    },
    marks: {
      strong: ({ children }: { children: string }) => `<strong>${children}</strong>`,
      em: ({ children }: { children: string }) => `<em class="italic">${children}</em>`,
    },
  }
  
  return toHTML(portableText, { components } as any)
}

// Convert PortableText to plain text string (for cases where HTML isn't needed)
export function portableTextToString(portableText: any[]): string {
  if (!portableText || !Array.isArray(portableText)) {
    return ''
  }
  
  // Simple text extraction without external dependency
  return portableText
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children.map((child: any) => child.text || '').join('')
      }
      return ''
    })
    .join(' ')
}

// Check if content is PortableText array
export function isPortableText(content: any): content is any[] {
  return Array.isArray(content) && content.length > 0 && content[0]._type === 'block'
}