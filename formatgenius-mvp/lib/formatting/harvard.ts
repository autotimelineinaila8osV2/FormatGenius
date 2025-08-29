// Harvard citation style formatting utilities for FormatGenius

export interface Citation {
  type: 'book' | 'journal' | 'website' | 'newspaper' | 'conference' | 'thesis' | 'other'
  authors: Author[]
  year: number
  title: string
  publication?: string
  publisher?: string
  place?: string
  volume?: string
  issue?: string
  pages?: string
  url?: string
  accessed?: string
  doi?: string
  isbn?: string
  issn?: string
}

export interface Author {
  firstName: string
  lastName: string
  middleName?: string
}

export interface HarvardFormattingRules {
  font: string
  fontSize: number
  lineSpacing: number
  margins: {
    top: number
    bottom: number
    left: number
    right: number
  }
  paragraphSpacing: number
  headerFormat: 'centered' | 'left-aligned'
  pageNumbers: 'top-right' | 'bottom-center' | 'none'
}

export class HarvardFormatter {
  private rules: HarvardFormattingRules

  constructor(rules?: Partial<HarvardFormattingRules>) {
    this.rules = {
      font: 'Times New Roman',
      fontSize: 12,
      lineSpacing: 1.5,
      margins: {
        top: 1,
        bottom: 1,
        left: 1.5,
        right: 1
      },
      paragraphSpacing: 0,
      headerFormat: 'centered',
      pageNumbers: 'top-right',
      ...rules
    }
  }

  /**
   * Format an in-text citation
   */
  formatInTextCitation(citation: Citation): string {
    if (citation.authors.length === 0) {
      return `(${citation.year})`
    }

    if (citation.authors.length === 1) {
      const author = citation.authors[0]
      return `(${author.lastName}, ${citation.year})`
    }

    if (citation.authors.length === 2) {
      const author1 = citation.authors[0]
      const author2 = citation.authors[1]
      return `(${author1.lastName} and ${author2.lastName}, ${citation.year})`
    }

    if (citation.authors.length === 3) {
      const author1 = citation.authors[0]
      const author2 = citation.authors[1]
      const author3 = citation.authors[2]
      return `(${author1.lastName}, ${author2.lastName} and ${author3.lastName}, ${citation.year})`
    }

    // More than 3 authors
    const firstAuthor = citation.authors[0]
    return `(${firstAuthor.lastName} et al., ${citation.year})`
  }

  /**
   * Format a reference list entry
   */
  formatReference(citation: Citation): string {
    switch (citation.type) {
      case 'book':
        return this.formatBookReference(citation)
      case 'journal':
        return this.formatJournalReference(citation)
      case 'website':
        return this.formatWebsiteReference(citation)
      case 'newspaper':
        return this.formatNewspaperReference(citation)
      case 'conference':
        return this.formatConferenceReference(citation)
      case 'thesis':
        return this.formatThesisReference(citation)
      default:
        return this.formatGenericReference(citation)
    }
  }

  /**
   * Format book reference
   */
  private formatBookReference(citation: Citation): string {
    const authors = this.formatAuthors(citation.authors)
    const title = this.formatTitle(citation.title)
    const edition = citation.publication ? `, ${citation.publication}` : ''
    const place = citation.place ? `${citation.place}: ` : ''
    const publisher = citation.publisher || 'Unknown Publisher'
    const year = citation.year

    return `${authors} (${year}) ${title}${edition}. ${place}${publisher}.`
  }

  /**
   * Format journal reference
   */
  private formatJournalReference(citation: Citation): string {
    const authors = this.formatAuthors(citation.authors)
    const title = this.formatTitle(citation.title)
    const journal = citation.publication || 'Unknown Journal'
    const volume = citation.volume ? `, ${citation.volume}` : ''
    const issue = citation.issue ? `(${citation.issue})` : ''
    const pages = citation.pages ? `, pp. ${citation.pages}` : ''
    const year = citation.year

    return `${authors} (${year}) ${title}. ${journal}${volume}${issue}${pages}.`
  }

  /**
   * Format website reference
   */
  private formatWebsiteReference(citation: Citation): string {
    const authors = citation.authors.length > 0 ? this.formatAuthors(citation.authors) : 'Unknown Author'
    const title = this.formatTitle(citation.title)
    const year = citation.year
    const url = citation.url ? `Available at: ${citation.url}` : ''
    const accessed = citation.accessed ? ` (Accessed: ${citation.accessed})` : ''

    return `${authors} (${year}) ${title}. ${url}${accessed}.`
  }

  /**
   * Format newspaper reference
   */
  private formatNewspaperReference(citation: Citation): string {
    const authors = citation.authors.length > 0 ? this.formatAuthors(citation.authors) : 'Unknown Author'
    const title = this.formatTitle(citation.title)
    const newspaper = citation.publication || 'Unknown Newspaper'
    const date = citation.accessed || citation.year.toString()
    const pages = citation.pages ? `, p. ${citation.pages}` : ''

    return `${authors} (${date}) ${title}. ${newspaper}${pages}.`
  }

  /**
   * Format conference reference
   */
  private formatConferenceReference(citation: Citation): string {
    const authors = this.formatAuthors(citation.authors)
    const title = this.formatTitle(citation.title)
    const conference = citation.publication || 'Unknown Conference'
    const place = citation.place ? `, ${citation.place}` : ''
    const date = citation.accessed || citation.year.toString()
    const pages = citation.pages ? `, pp. ${citation.pages}` : ''

    return `${authors} (${date}) ${title}. In: ${conference}${place}. ${pages}.`
  }

  /**
   * Format thesis reference
   */
  private formatThesisReference(citation: Citation): string {
    const authors = this.formatAuthors(citation.authors)
    const title = this.formatTitle(citation.title)
    const type = citation.publication || 'Thesis'
    const institution = citation.publisher || 'Unknown Institution'
    const year = citation.year

    return `${authors} (${year}) ${title}. ${type}. ${institution}.`
  }

  /**
   * Format generic reference
   */
  private formatGenericReference(citation: Citation): string {
    const authors = citation.authors.length > 0 ? this.formatAuthors(citation.authors) : 'Unknown Author'
    const title = this.formatTitle(citation.title)
    const publication = citation.publication ? `, ${citation.publication}` : ''
    const year = citation.year

    return `${authors} (${year}) ${title}${publication}.`
  }

  /**
   * Format authors list for reference
   */
  private formatAuthors(authors: Author[]): string {
    if (authors.length === 0) {
      return 'Unknown Author'
    }

    if (authors.length === 1) {
      const author = authors[0]
      return `${author.lastName}, ${author.firstName.charAt(0)}.`
    }

    if (authors.length === 2) {
      const author1 = authors[0]
      const author2 = authors[1]
      return `${author1.lastName}, ${author1.firstName.charAt(0)}. and ${author2.firstName.charAt(0)}. ${author2.lastName}`
    }

    if (authors.length === 3) {
      const author1 = authors[0]
      const author2 = authors[1]
      const author3 = authors[2]
      return `${author1.lastName}, ${author1.firstName.charAt(0)}., ${author2.firstName.charAt(0)}. ${author2.lastName} and ${author3.firstName.charAt(0)}. ${author3.lastName}`
    }

    // More than 3 authors
    const firstAuthor = authors[0]
    const otherAuthors = authors.slice(1)
    const otherNames = otherAuthors.map(author => `${author.firstName.charAt(0)}. ${author.lastName}`).join(', ')
    return `${firstAuthor.lastName}, ${firstAuthor.firstName.charAt(0)}., ${otherNames}`
  }

  /**
   * Format title (capitalize first letter of each major word)
   */
  private formatTitle(title: string): string {
    const minorWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet']
    
    return title.split(' ').map((word, index) => {
      if (index === 0 || !minorWords.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
      return word.toLowerCase()
    }).join(' ')
  }

  /**
   * Get document formatting rules
   */
  getFormattingRules(): HarvardFormattingRules {
    return { ...this.rules }
  }

  /**
   * Update formatting rules
   */
  updateFormattingRules(newRules: Partial<HarvardFormattingRules>): void {
    this.rules = { ...this.rules, ...newRules }
  }

  /**
   * Validate citation data
   */
  validateCitation(citation: Citation): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!citation.title || citation.title.trim() === '') {
      errors.push('Title is required')
    }

    if (!citation.year || citation.year < 1000 || citation.year > new Date().getFullYear() + 1) {
      errors.push('Valid year is required')
    }

    if (citation.authors.length === 0 && citation.type !== 'website' && citation.type !== 'newspaper') {
      errors.push('At least one author is required for this citation type')
    }

    if (citation.type === 'website' && !citation.url) {
      errors.push('URL is required for website citations')
    }

    if (citation.type === 'journal' && !citation.publication) {
      errors.push('Journal name is required for journal citations')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Generate citation examples
   */
  static getExamples(): Record<string, Citation> {
    return {
      book: {
        type: 'book',
        authors: [
          { firstName: 'John', lastName: 'Smith' },
          { firstName: 'Jane', lastName: 'Doe' }
        ],
        year: 2020,
        title: 'Introduction to Academic Writing',
        publication: '2nd edn',
        publisher: 'Academic Press',
        place: 'London'
      },
      journal: {
        type: 'journal',
        authors: [
          { firstName: 'Michael', lastName: 'Johnson' }
        ],
        year: 2021,
        title: 'The Impact of Digital Technology on Education',
        publication: 'Journal of Educational Technology',
        volume: '15',
        issue: '3',
        pages: '45-62'
      },
      website: {
        type: 'website',
        authors: [
          { firstName: 'Sarah', lastName: 'Wilson' }
        ],
        year: 2022,
        title: 'Modern Citation Styles: A Comprehensive Guide',
        url: 'https://example.com/citation-guide',
        accessed: '15 January 2024'
      }
    }
  }
}

// Export default formatter instance
export const harvardFormatter = new HarvardFormatter()
