import { NextRequest, NextResponse } from 'next/server'

interface JobData {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  message: string
  filename: string
  format: string
  createdAt: string
  completedAt?: string
  downloadUrl?: string
}

// Mock database - in a real app, this would be a database query
const mockJobs: Record<string, JobData> = {
  'job_1': {
    id: 'job_1',
    status: 'completed',
    progress: 100,
    message: 'Document formatted successfully in Harvard style',
    filename: 'research_paper.docx',
    format: 'harvard',
    createdAt: '2024-01-15T10:30:00Z',
    completedAt: '2024-01-15T11:15:00Z',
    downloadUrl: '/api/jobs/job_1/download'
  },
  'job_2': {
    id: 'job_2',
    status: 'processing',
    progress: 65,
    message: 'Applying APA formatting rules...',
    filename: 'business_report.pdf',
    format: 'apa',
    createdAt: '2024-01-15T14:20:00Z'
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      )
    }

    // In a real application, you would query your database here
    // For now, we'll use mock data
    const job = mockJobs[jobId]

    if (!job) {
      // Simulate a new job being created
      const newJob: JobData = {
        id: jobId,
        status: 'pending',
        progress: 0,
        message: 'Job queued for processing',
        filename: 'document.docx',
        format: 'harvard',
        createdAt: new Date().toISOString()
      }

      // Simulate job progression
      setTimeout(() => {
        newJob.status = 'processing'
        newJob.progress = 25
        newJob.message = 'Analyzing document structure...'
        mockJobs[jobId] = newJob
      }, 2000)

      setTimeout(() => {
        newJob.progress = 50
        newJob.message = 'Applying formatting rules...'
        mockJobs[jobId] = newJob
      }, 4000)

      setTimeout(() => {
        newJob.progress = 75
        newJob.message = 'Finalizing formatting...'
        mockJobs[jobId] = newJob
      }, 6000)

      setTimeout(() => {
        newJob.status = 'completed'
        newJob.progress = 100
        newJob.message = 'Document formatted successfully!'
        newJob.completedAt = new Date().toISOString()
        newJob.downloadUrl = `/api/jobs/${jobId}/download`
        mockJobs[jobId] = newJob
      }, 8000)

      return NextResponse.json(newJob)
    }

    return NextResponse.json(job)

  } catch (error) {
    console.error('Error fetching job status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
