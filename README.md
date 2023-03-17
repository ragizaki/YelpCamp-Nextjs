# Yelp Camp (Next.js, TypeScript, Prisma, SQL Stack)

This is a remastered version of my original Yelp Camp application, using <a href="https://nextjs.org/">Next.js</a>, <a href="https://www.prisma.io/">Prisma</a> and <a href="https://next-auth.js.org/">Next-Auth</a> to learn the stack. I've rarely used ORM's before, particularly Prisma, but the idea of mapping databases to JavaScript objects really interested me and I wanted to give it a try. I'll be updating this README occasionally with updates of my ideas, what I think of Prisma, and incoming features.

## Features

- Full authentication flow with NextAuth and client credentials
- CRUD functionality for campsites
- Deleting, creating and reading reviews
- Image uploading with Upload.io

Users have the ability to:

- Create, update and delete campsites
- Leave comments and rate other campsites
- Access a list of their posts
- Register / login seamlessly

## What I Learned
- Handle image uploads with Next.js
- Authenticate and authorize users
- ORM for the database
- Typesafe database queries with Prisma
- Deployment with Vercel

### Prisma

This project was one of my first times using ORM's at all, and I really enjoyed Prisma. It gives fully type-safe queries and an intuitive way of thinking of relations with objects. The autocompletion is really nice and I caught a lot of dev mistakes early with TypeScript.

### Nextjs

Next has been really nice to work with. The performance time is incredible, and the reload and compile times during development are noticeably better than CRA. Furthermore, due to its popularity, I found a lot of good documentation and compatability with external libraries, like Chakra UI and Next-Auth. The routing is really intuitive, and creating dynamic routes are seamless too. It definitely makes creating fullstack apps easier than vanilla React. There's some nuanced syntax you have to get used to, like getStaticProps, but overall it was a great experience.

### NextAuth

I have mixed feelings with NextAuth. This tool does not having amazing support / documentation for client credentials (username and password registration). For this reason, I would suggest only using this authentication library if you intend to support social providers (i.e. Google, Github, Facebook SSO). Otherwise, the client and server functions are easy to use and straightforward, and making checking authentication and getting sessions extremely easy.

## Incoming

I want to migrate this project over to <a href="https://nextjs.org/blog/next-13">Next.js 13</a> to test out the new `app` directory. Particularly, I'm interested in using React Server Components to render data on the server for quicker loading times and caching. I also want to try out the new routing system, to have easier loading and error states.
