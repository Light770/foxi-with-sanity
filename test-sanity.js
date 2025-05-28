import { getPricingPlans, getPricingPage } from './src/lib/sanity.js'

async function testSanity() {
  console.log('🧪 Testing Sanity connection...')
  
  try {
    console.log('\n📋 Testing pricing plans...')
    const plans = await getPricingPlans()
    console.log('Plans found:', plans?.length || 0)
    if (plans && plans.length > 0) {
      console.log('First plan:', plans[0])
    }
    
    console.log('\n📄 Testing pricing page...')
    const page = await getPricingPage()
    console.log('Page found:', page ? 'Yes' : 'No')
    if (page) {
      console.log('Page data:', page)
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testSanity()