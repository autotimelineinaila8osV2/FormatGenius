export default function HomePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Professional Document Formatting
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Transform your documents with our AI-powered formatting service. 
          Perfect for academic papers, business documents, and more.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/upload"
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Get Started
          </a>
          <a href="/pricing" className="text-sm font-semibold leading-6 text-gray-900">
            View Pricing <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Formatting</h3>
            <p className="text-gray-600">APA, MLA, Chicago, Harvard, and more citation styles</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Documents</h3>
            <p className="text-gray-600">Reports, proposals, and professional documents</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
            <p className="text-gray-600">Get your formatted documents back in hours, not days</p>
          </div>
        </div>
      </div>
    </div>
  )
}
