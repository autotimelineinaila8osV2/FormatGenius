'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface JobStatus {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  message: string
  downloadUrl?: string
}

export default function JobPage() {
  const params = useParams()
  const jobId = params.id as string
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobStatus = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`)
        if (response.ok) {
          const data = await response.json()
          setJobStatus(data)
        }
      } catch (error) {
        console.error('Failed to fetch job status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobStatus()
    
    // Poll for updates every 5 seconds if job is still processing
    const interval = setInterval(() => {
      if (jobStatus?.status === 'pending' || jobStatus?.status === 'processing') {
        fetchJobStatus()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [jobId, jobStatus?.status])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job status...</p>
        </div>
      </div>
    )
  }

  if (!jobStatus) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <p className="text-red-600">Job not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Job Status</h1>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600">Job ID</p>
            <p className="font-mono text-lg">{jobId}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Status</p>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                jobStatus.status === 'completed' ? 'bg-green-100 text-green-800' :
                jobStatus.status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {jobStatus.status.charAt(0).toUpperCase() + jobStatus.status.slice(1)}
              </span>
            </div>
          </div>

          {jobStatus.status === 'processing' && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${jobStatus.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{jobStatus.progress}%</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-600">Message</p>
            <p className="text-gray-900">{jobStatus.message}</p>
          </div>

          {jobStatus.status === 'completed' && jobStatus.downloadUrl && (
            <div className="pt-4">
              <a
                href={jobStatus.downloadUrl}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Download Formatted Document
              </a>
            </div>
          )}

          {jobStatus.status === 'failed' && (
            <div className="pt-4">
              <button
                onClick={() => window.location.href = '/upload'}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
