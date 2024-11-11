import React from 'react'
import { Link } from 'react-router-dom'

const subjects = ["Physics", "Chemistry", "Mathematics", "Biology"]

export default function SubjectCards() {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'box-shadow 0.3s',
  }

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%',
    maxWidth: '200px',
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 className='font-bold text-3xl' style={{ textAlign: 'center', marginBottom: '20px' }}>Subject Results</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {subjects.map((subject) => (
          <div key={subject} style={cardStyle}>
            <h2 className='text-lg font-semibold' style={{ textAlign: 'center', marginBottom: '15px' }}>{subject}</h2>
            <Link
              to={`/faculty/viewallresult?subject=${subject}`}
              style={buttonStyle}
              aria-label={`View ${subject} Result`}
            >
              View Result
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}