# Yelp Camp (Next.js, TypeScript, Prisma, SQL Stack)

This is a remastered version of my original Yelp Camp application, using Next.js and Prisma to learn the stack. I've rarely used ORM's before, particularly Prisma, but the idea of mapping databases to JavaScript objects really interested me and I wanted to give it a try. I'll be updating this README occasionally with updates of my ideas, what I think of Prisma, and incoming features.

## Built With
 - Next.js 

## Features

- Full authentication flow with NextAuth and Github
- CRUD functionality for campsites
- Image uploading with Upload.io

Users have the ability to:

- Create, update and delete campsites
- Leave comments and rate other campsites
- Access a list of their posts
- Register / login seamlessly

## Thoughts

### Prisma

This project was one of my first times using ORM's at all, and I really enjoyed Prisma. It gives fully type-safe queries and an intuitive way of thinking of relations with objects. The autocompletion is really nice and I caught a lot of dev mistakes early with TypeScript.

### Nextjs

Next has been really nice to work with. The performance time is incredible, and the reload and compile times during development are noticeably better than CRA. Furthermore, due to its popularity, I found a lot of good documentation and compatability with external libraries, like Chakra UI and Next-Auth. The routing is really intuitive, and creating dynamic routes are seamless too. It definitely makes creating fullstack apps easier than vanilla React. There's some nuanced syntax you have to get used to, like getStaticProps, but overall it was a great experience.

### NextAuth

I have mixed feelings with NextAuth. This tool does not having amazing support / documentation for client credentials (username and password registration). For this reason, I would suggest only using this authentication library if you intend to support social providers (i.e. Google, Github, Facebook SSO). Otherwise, the client and server functions are easy to use and straightforward, and making checking authentication and getting sessions extremely easy.
