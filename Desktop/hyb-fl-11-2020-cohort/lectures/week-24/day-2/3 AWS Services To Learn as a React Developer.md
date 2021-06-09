# 3 AWS Services To Learn as a React Developer

## Knowledge of the cloud will make you more valuable in the job market!
May 27, 2021 | Dr. Vicki Bealman

More and more companies are migrating their infrastructure to the cloud, so developers who are familiar with cloud technologies are high in demand!

- AWS is the biggest player in the cloud market. So, it makes total sense to start with AWS.

But where do you start? AWS has over 170 services.

This article discusses the three most relevant services to React developers.

## Main Ingredients

Modern applications have some basic features:
- Storage
- Database
- Authentication
- Hosting

We will explore which AWS services can help us to implement these features. They should be the top priorities while learning AWS as a React developer.

1. **S3 (Simple Storage Service)**
According to the documentation:
  - “Amazon Simple Storage Service (Amazon S3) is an object storage service which offers industry-leading scalability, data availability, security, and performance.”

  - Knowledge of S3 is crital for a frontend developer because many companies are taking advantage of this cheap and easy-to-use service!

    - There are two main use cases for AWS S3.
      - **Storage**; If you are building an e-commerce platform, you need to store many images. Where do you store them? Maybe you have a small application where you work with very large JSON datasets not practical to store on any database.
        - AWS S3 is a perfect fit for these use cases. Key advantages:
          - Cheaper
          - Secure
          - Highly available
        - Here is a [resource for you to get started](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html):

      - **Hosting** Any single-page application (SPA) generates static files after the build. This means you can access those files to access the website. This is why AWS S3 is an excellent choice. You just upload the files to the bucket and access the URL. It’s that simple. 
        - It also has some other advantages:
          - HTTPS by default
          - Easy integration with Route53
          - Easy support for CI/CD pipeline
          - Connecting to CDN is simple
        - Here is a [resource to get you started](https://youtu.be/Mgs7jl430vs).

 2. **DynamoDB**
According to the [documentation](https://aws.amazon.com/dynamodb/):
  - “Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale.”
  - It’s very popular among companies for several reasons:
    - Fast and easy to use
    - Flexible data structure
    - Highly scalable
    - Predictable performance
  - So if you are a pure frontend developer but want to use some kind of database, then DynamoDB is a good choicet.
  - There is a good chance sometime in the future, you will need to use DynamoDB for some application, so let’s learn it now!
  - [How To Use AWS DynamoDB in React](https://betterprogramming.pub/how-to-use-aws-dynamodb-in-react-70b55ffff93e)

 3. **Amplify**
Regardless what kind of application you are building, at some point, you will need to introduce authentication to it. If you are a frontend developer, then it’s very painful to set up a proper authentication backend by yourself.
  - That’s where services like Firebase are helpful. Although I believe Firebase is better, if you or your company only want to use AWS services, then AWS Amplify is the solution for you!
  - It takes away the hassle of setting up an authentication mechanism. Also, it has excellent support for React, so it’s easy to use.
  - [Authentication with Amplify](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js)

## SUMMARY
These are the three most relevant AWS services in terms of popularity and integration with React. Demand for a good React developer is very high. If you have knowledge of the cloud, this can make you an even more attractive hire for any company!

Dr. Vicki Bealman
