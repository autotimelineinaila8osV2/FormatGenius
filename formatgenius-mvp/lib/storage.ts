// Storage utilities for FormatGenius - handles file operations and cloud storage

export interface FileMetadata {
  id: string
  filename: string
  originalName: string
  size: number
  mimeType: string
  userId: string
  jobId?: string
  uploadedAt: string
  lastModified: string
  checksum: string
  status: 'uploading' | 'uploaded' | 'processing' | 'completed' | 'failed'
  tags?: string[]
  metadata?: Record<string, any>
}

export interface StorageConfig {
  provider: 'local' | 'aws-s3' | 'google-cloud' | 'azure-blob'
  bucket?: string
  region?: string
  accessKey?: string
  secretKey?: string
  endpoint?: string
  maxFileSize: number
  allowedMimeTypes: string[]
  retentionDays: number
}

export interface UploadResult {
  success: boolean
  fileId: string
  url?: string
  error?: string
  metadata: FileMetadata
}

export interface DownloadResult {
  success: boolean
  data?: Buffer
  url?: string
  error?: string
  metadata?: FileMetadata
}

// Mock storage for development - in production, this would integrate with cloud storage
class MockStorageService {
  private files: Map<string, FileMetadata> = new Map()
  private fileData: Map<string, Buffer> = new Map()
  private config: StorageConfig

  constructor(config: StorageConfig) {
    this.config = config
  }

  /**
   * Upload a file to storage
   */
  async uploadFile(
    file: Buffer,
    filename: string,
    mimeType: string,
    userId: string,
    jobId?: string
  ): Promise<UploadResult> {
    try {
      // Validate file size
      if (file.length > this.config.maxFileSize) {
        return {
          success: false,
          fileId: '',
          error: `File size ${file.length} exceeds maximum allowed size ${this.config.maxFileSize}`,
          metadata: {} as FileMetadata
        }
      }

      // Validate MIME type
      if (!this.config.allowedMimeTypes.includes(mimeType)) {
        return {
          success: false,
          fileId: '',
          error: `MIME type ${mimeType} is not allowed`,
          metadata: {} as FileMetadata
        }
      }

      // Generate unique file ID
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Create file metadata
      const metadata: FileMetadata = {
        id: fileId,
        filename: filename,
        originalName: filename,
        size: file.length,
        mimeType: mimeType,
        userId: userId,
        jobId: jobId,
        uploadedAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        checksum: this.generateChecksum(file),
        status: 'uploaded',
        tags: [],
        metadata: {}
      }

      // Store file and metadata
      this.files.set(fileId, metadata)
      this.fileData.set(fileId, file)

      console.log(`File uploaded successfully: ${fileId}`)

      return {
        success: true,
        fileId: fileId,
        url: `/api/storage/${fileId}`,
        metadata: metadata
      }

    } catch (error) {
      console.error('Upload error:', error)
      return {
        success: false,
        fileId: '',
        error: 'Upload failed',
        metadata: {} as FileMetadata
      }
    }
  }

  /**
   * Download a file from storage
   */
  async downloadFile(fileId: string): Promise<DownloadResult> {
    try {
      const metadata = this.files.get(fileId)
      
      if (!metadata) {
        return {
          success: false,
          error: 'File not found'
        }
      }

      const fileData = this.fileData.get(fileId)
      
      if (!fileData) {
        return {
          success: false,
          error: 'File data not found'
        }
      }

      return {
        success: true,
        data: fileData,
        metadata: metadata
      }

    } catch (error) {
      console.error('Download error:', error)
      return {
        success: false,
        error: 'Download failed'
      }
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(fileId: string): Promise<FileMetadata | null> {
    return this.files.get(fileId) || null
  }

  /**
   * Update file metadata
   */
  async updateFileMetadata(fileId: string, updates: Partial<FileMetadata>): Promise<boolean> {
    try {
      const metadata = this.files.get(fileId)
      
      if (!metadata) {
        return false
      }

      const updatedMetadata = { ...metadata, ...updates, lastModified: new Date().toISOString() }
      this.files.set(fileId, updatedMetadata)
      
      return true
    } catch (error) {
      console.error('Update metadata error:', error)
      return false
    }
  }

  /**
   * Delete a file from storage
   */
  async deleteFile(fileId: string): Promise<boolean> {
    try {
      const metadata = this.files.get(fileId)
      
      if (!metadata) {
        return false
      }

      // Remove file and metadata
      this.files.delete(fileId)
      this.fileData.delete(fileId)
      
      console.log(`File deleted successfully: ${fileId}`)
      return true

    } catch (error) {
      console.error('Delete error:', error)
      return false
    }
  }

  /**
   * List files for a user
   */
  async listUserFiles(userId: string, filters?: {
    status?: string
    mimeType?: string
    tags?: string[]
  }): Promise<FileMetadata[]> {
    try {
      let files = Array.from(this.files.values()).filter(file => file.userId === userId)
      
      // Apply filters
      if (filters?.status) {
        files = files.filter(file => file.status === filters.status)
      }
      
      if (filters?.mimeType) {
        files = files.filter(file => file.mimeType === filters.mimeType)
      }
      
      if (filters?.tags && filters.tags.length > 0) {
        files = files.filter(file => 
          file.tags && filters.tags!.some(tag => file.tags!.includes(tag))
        )
      }
      
      return files.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    } catch (error) {
      console.error('List files error:', error)
      return []
    }
  }

  /**
   * Generate checksum for file validation
   */
  private generateChecksum(data: Buffer): string {
    // Simple checksum for demo - in production, use crypto.createHash('sha256')
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data[i]
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(16)
  }

  /**
   * Clean up expired files
   */
  async cleanupExpiredFiles(): Promise<number> {
    try {
      const now = new Date()
      const expiredFiles: string[] = []
      
      for (const [fileId, metadata] of this.files.entries()) {
        const uploadDate = new Date(metadata.uploadedAt)
        const daysSinceUpload = (now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24)
        
        if (daysSinceUpload > this.config.retentionDays) {
          expiredFiles.push(fileId)
        }
      }
      
      // Delete expired files
      for (const fileId of expiredFiles) {
        await this.deleteFile(fileId)
      }
      
      console.log(`Cleaned up ${expiredFiles.length} expired files`)
      return expiredFiles.length
      
    } catch (error) {
      console.error('Cleanup error:', error)
      return 0
    }
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<{
    totalFiles: number
    totalSize: number
    averageFileSize: number
    filesByStatus: Record<string, number>
    filesByType: Record<string, number>
  }> {
    try {
      const files = Array.from(this.files.values())
      const totalFiles = files.length
      const totalSize = files.reduce((sum, file) => sum + file.size, 0)
      const averageFileSize = totalFiles > 0 ? totalSize / totalFiles : 0
      
      const filesByStatus: Record<string, number> = {}
      const filesByType: Record<string, number> = {}
      
      for (const file of files) {
        filesByStatus[file.status] = (filesByStatus[file.status] || 0) + 1
        filesByType[file.mimeType] = (filesByType[file.mimeType] || 0) + 1
      }
      
      return {
        totalFiles,
        totalSize,
        averageFileSize,
        filesByStatus,
        filesByType
      }
      
    } catch (error) {
      console.error('Get stats error:', error)
      return {
        totalFiles: 0,
        totalSize: 0,
        averageFileSize: 0,
        filesByStatus: {},
        filesByType: {}
      }
    }
  }
}

// Default storage configuration
const defaultConfig: StorageConfig = {
  provider: 'local',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/pdf'
  ],
  retentionDays: 90
}

// Create storage service instance
export const storageService = new MockStorageService(defaultConfig)

// Export the service class for testing or custom instances
export { MockStorageService as StorageService }
