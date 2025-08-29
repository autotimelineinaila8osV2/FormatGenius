export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: 'per document',
      features: [
        'Up to 20 pages',
        'Standard formatting',
        '24-hour turnaround',
        'Basic citation styles',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$19.99',
      period: 'per document',
      features: [
        'Up to 50 pages',
        'Advanced formatting',
        '12-hour turnaround',
        'All citation styles',
        'Priority support',
        'Format validation'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$39.99',
      period: 'per document',
      features: [
        'Unlimited pages',
        'Premium formatting',
        '6-hour turnaround',
        'Custom citation styles',
        'Dedicated support',
        'Quality guarantee',
        'Multiple revisions'
      ],
      popular: false
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Choose the plan that best fits your needs. All plans include our quality guarantee.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white p-8 rounded-lg shadow-sm border ${
              plan.popular ? 'ring-2 ring-primary-600' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-lg text-gray-600">/{plan.period}</span>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                className={`w-full py-3 px-4 rounded-md text-sm font-medium ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Plan?</h2>
        <p className="text-gray-600 mb-6">
          Contact us for bulk pricing, custom formatting requirements, or enterprise solutions.
        </p>
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Contact Sales
        </button>
      </div>
    </div>
  )
}
