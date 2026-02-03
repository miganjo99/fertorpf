'use client';
import { InstagramEmbed } from 'react-social-media-embed';

export default function InstagramPost() {
  return (
    <div className="flex justify-center w-full">     
      <InstagramEmbed 
        url="https://www.instagram.com/p/C-uOyNzsTKy/" 
        width={328} 
        captioned
      />
    </div>
  );
}