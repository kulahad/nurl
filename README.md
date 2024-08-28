# Nurl - Nano URL Shortener

Nurl (Nano URL) is a simple, open-source URL shortener built with Next.js, MongoDB, and Tailwind CSS.

## Features

- Shorten long URLs to easily shareable nano links
- Custom short URL slugs (coming soon)
- Responsive design
  
## QR Code Feature

Nurl now supports generating QR codes for shortened URLs. This feature allows users to easily share their shortened URLs via QR codes.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) (for deployment)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB instance (local or cloud-based)

## Getting Started

1. Clone the repository:
2. Install dependencies: `npm i`
3. Set up environment variables:
4. Create a `.env.local` file in the root directory and add the following: 
         1. `MONGODB_URI` - your mongo db instance ( make a db named `nurl` and a collection named `urls`)
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see Nurl in action.

## Deployment

Nurl is set up for easy deployment on Vercel. To deploy your own instance:

1. Fork this repository
2. Sign up for a [Vercel account](https://vercel.com/signup)
3. Connect your forked repository to Vercel
4. Set up the required environment variables in Vercel's project settings
5. Deploy!

For hosting, ensure you have a MongoDB instance set up and the proper permissions configured.

## Contributing

Contributions to Nurl are welcome! Please feel free to submit a Pull Request.

## License

Nurl is open source and available under the [MIT License](LICENSE).

Got inspired by [roadmaps.sh](https://roadmap.sh/projects/url-shortening-service) with fontend baked in.
