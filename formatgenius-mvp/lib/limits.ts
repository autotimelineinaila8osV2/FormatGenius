// Service limits and constraints for FormatGenius

export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILE_SIZE_READABLE: '10MB',
  ALLOWED_FILE_TYPES: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/msword', // .doc
    'application/pdf' // .pdf
  ],
  ALLOWED_FILE_EXTENSIONS: ['.docx', '.doc', '.pdf'],
  MAX_FILES_PER_UPLOAD: 1,
  MAX_UPLOADS_PER_HOUR: 10,
  MAX_UPLOADS_PER_DAY: 50
}

export const PROCESSING_LIMITS = {
  MAX_PAGES_PER_DOCUMENT: 200,
  MAX_PROCESSING_TIME: 30 * 60 * 1000, // 30 minutes
  MAX_CONCURRENT_JOBS: 5,
  JOB_TIMEOUT: 45 * 60 * 1000, // 45 minutes
  RETRY_ATTEMPTS: 3
}

export const FORMATTING_LIMITS = {
  SUPPORTED_STYLES: ['harvard', 'apa', 'mla', 'chicago', 'ieee', 'vancouver'],
  MAX_CITATIONS_PER_DOCUMENT: 1000,
  MAX_REFERENCES_PER_DOCUMENT: 500,
  MAX_TABLES_PER_DOCUMENT: 50,
  MAX_FIGURES_PER_DOCUMENT: 100
}

export const STORAGE_LIMITS = {
  MAX_STORAGE_PER_USER: 5 * 1024 * 1024 * 1024, // 5GB
  MAX_STORAGE_PER_USER_READABLE: '5GB',
  FILE_RETENTION_DAYS: 90,
  BACKUP_RETENTION_DAYS: 365
}

export const RATE_LIMITS = {
  API_REQUESTS_PER_MINUTE: 60,
  API_REQUESTS_PER_HOUR: 1000,
  DOWNLOAD_REQUESTS_PER_HOUR: 100,
  UPLOAD_REQUESTS_PER_HOUR: 20
}

export const SUBSCRIPTION_LIMITS = {
  BASIC: {
    maxPages: 20,
    maxDocumentsPerMonth: 10,
    turnaroundTime: '24 hours',
    supportLevel: 'email'
  },
  PROFESSIONAL: {
    maxPages: 50,
    maxDocumentsPerMonth: 25,
    turnaroundTime: '12 hours',
    supportLevel: 'priority'
  },
  ENTERPRISE: {
    maxPages: -1, // unlimited
    maxDocumentsPerMonth: -1, // unlimited
    turnaroundTime: '6 hours',
    supportLevel: 'dedicated'
  }
}

export const VALIDATION_RULES = {
  FILENAME: {
    minLength: 1,
    maxLength: 255,
    allowedCharacters: /^[a-zA-Z0-9\s\-_\.()]+$/,
    disallowedExtensions: ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs']
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254
  },
  JOB_ID: {
    pattern: /^job_[a-zA-Z0-9_]+$/,
    minLength: 10,
    maxLength: 50
  }
}

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: `File size exceeds the maximum limit of ${UPLOAD_LIMITS.MAX_FILE_SIZE_READABLE}`,
  INVALID_FILE_TYPE: 'File type not supported. Please upload a DOCX, DOC, or PDF file.',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please try again later.',
  STORAGE_LIMIT_EXCEEDED: 'Storage limit exceeded. Please upgrade your plan or delete some files.',
  PROCESSING_TIMEOUT: 'Document processing timed out. Please try again.',
  INVALID_FORMAT: 'Invalid formatting style selected.',
  JOB_NOT_FOUND: 'Job not found or access denied.',
  UNAUTHORIZED: 'Authentication required to access this resource.'
}

export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: 'Document uploaded successfully. Processing started.',
  PROCESSING_COMPLETE: 'Document formatting completed successfully.',
  DOWNLOAD_READY: 'Your formatted document is ready for download.',
  JOB_CREATED: 'New formatting job created successfully.',
  FILE_DELETED: 'File deleted successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.'
}
