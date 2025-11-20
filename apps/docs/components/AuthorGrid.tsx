'use client';

import { getAllAuthors } from '@config/site.config';
import type { Author } from '@repo/shared';

function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="author-card">
      <div className="author-card-header">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            className="author-avatar"
          />
        )}
        <div>
          <h3>{author.name}</h3>
          <p className="author-title">{author.title}</p>
          {author.company && (
            <p className="author-company">{author.company}</p>
          )}
          {author.location && (
            <p className="author-location">{author.location}</p>
          )}
        </div>
      </div>

      <p className="author-bio">{author.bio}</p>

      {author.expertise && author.expertise.length > 0 && (
        <div className="author-expertise">
          <strong>Expertise:</strong>
          <div className="expertise-tags">
            {author.expertise.map((skill: string) => (
              <span key={skill} className="expertise-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {author.social && (
        <div className="author-social">
          {author.social.github && (
            <a
              href={author.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>
          )}
          {author.social.twitter && (
            <a
              href={author.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              Twitter
            </a>
          )}
          {author.social.linkedin && (
            <a
              href={author.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          )}
          {author.website && (
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
            >
              Website
            </a>
          )}
          {author.social.email && (
            <a
              href={`mailto:${author.social.email}`}
              aria-label="Email"
            >
              Email
            </a>
          )}
        </div>
      )}

      <style jsx>{`
        .author-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          background: white;
          transition: box-shadow 0.2s;
        }

        .author-card:hover {
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .author-card-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .author-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-card h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .author-title {
          margin: 0.25rem 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .author-company,
        .author-location {
          margin: 0.125rem 0;
          color: #9ca3af;
          font-size: 0.75rem;
        }

        .author-bio {
          margin: 1rem 0;
          line-height: 1.6;
          color: #374151;
        }

        .author-expertise {
          margin: 1rem 0;
        }

        .author-expertise strong {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .expertise-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .expertise-tag {
          background: #f3f4f6;
          color: #374151;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .author-social {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .author-social a {
          color: #3b82f6;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .author-social a:hover {
          text-decoration: underline;
        }

        @media (prefers-color-scheme: dark) {
          .author-card {
            background: #1f2937;
            border-color: #374151;
          }

          .author-title {
            color: #9ca3af;
          }

          .author-company,
          .author-location {
            color: #6b7280;
          }

          .author-bio {
            color: #d1d5db;
          }

          .expertise-tag {
            background: #374151;
            color: #d1d5db;
          }

          .author-social {
            border-top-color: #374151;
          }

          .author-social a {
            color: #60a5fa;
          }
        }
      `}</style>
    </div>
  );
}

export function AuthorGrid() {
  const authors = getAllAuthors();

  return (
    <>
      <div className="author-grid">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>

      <style jsx>{`
        .author-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        @media (max-width: 768px) {
          .author-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
