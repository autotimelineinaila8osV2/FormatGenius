'use client'

import { useState, useEffect } from 'react'

interface JobHistory {
  id: string
  filename: string
  format: string
  status: 'completed' | 'failed'
  createdAt: string
  completedAt?: string
  downloadUrl?: string
}

export default function HistoryPage() {
  const [jobs, setJobs] = useState<JobHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // In a real app, this would fetch from an API
        // For now, we'll use mock data
        const mockJobs: JobHistory[] = [
          {
            id: '1',
            filename: 'research_paper.docx',
            format: 'Harvard',
            status: 'completed',
            createdAt: '2024-01-15T10:30:00Z',
            completedAt: '2024-01-15T11:15:00Z',
            downloadUrl: '/api/jobs/1/download'
          },
          {
            id: '2',
            filename: 'business_report.pdf',
            format: 'APA',
            status: 'completed',
            createdAt: '2024-01-14T14:20:00Z',
            completedAt: '2024-01-14T15:05:00Z',
            downloadUrl: '/api/jobs/2/download'
          },
          {
            id: '3',
            filename: 'essay.docx',
            format: 'MLA',
            status: 'failed',
            createdAt: '2024-01-13T09:45:00Z'
          }
        ]
        
        setJobs(mockJobs)
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Document History</h1>
        </div>
        
        {jobs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No documents found. Upload your first document to get started.</p>
            <a
              href="/upload"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Upload Document
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.filename}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.format}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(job.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {job.status === 'completed' && job.downloadUrl ? (
                        <a
                          href={job.downloadUrl}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400">No action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
