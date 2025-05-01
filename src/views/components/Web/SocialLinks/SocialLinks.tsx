import React from 'react';
import { LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import './SocialLinks.scss';

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://www.linkedin.com/in/david-tomas-pizarro-frick/"
        className="linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedinOutlined />
      </a>
      <a href="https://github.com/DTPF" className="github" target="_blank" rel="noopener noreferrer">
        <GithubOutlined />
      </a>
    </div>
  );
}
