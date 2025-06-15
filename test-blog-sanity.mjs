import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

console.log('🧪 Testing blog posts in Sanity...')
console.log(`📊 Project: ${process.env.SANITY_PROJECT_ID}`)
console.log(`📦 Dataset: ${process.env.SANITY_DATASET}`)

// Test blog posts query
async function testBlogPosts() {
  try {
    const query = `*[_type == "blog"] | order(pubDate desc) {
      _id,
      title,
      slug,
      description,
      pubDate,
      author,
      "image": image.asset->url,
      tags
    }`
    
    const posts = await sanityClient.fetch(query)
    console.log('\n📝 Blog posts found:', posts?.length || 0)
    
    if (posts && posts.length > 0) {
      console.log('\nFirst blog post:')
      console.log(JSON.stringify(posts[0], null, 2))
    } else {
      console.log('\n⚠️  No blog posts found in Sanity')
      
      // Check if any documents exist
      const allDocsQuery = `*[_type == "blog"][]._type`
      const allDocs = await sanityClient.fetch(allDocsQuery)
      console.log('\nTotal blog documents in dataset:', allDocs.length)
    }
    
    // Check all document types
    const typesQuery = `array::unique(*[]._type)`
    const types = await sanityClient.fetch(typesQuery)
    console.log('\n📋 All document types in dataset:', types)
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.statusCode === 401) {
      console.error('💡 Make sure SANITY_TOKEN is valid and has read permissions')
    }
  }
}

testBlogPosts()