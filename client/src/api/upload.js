// const invoice = () => {
//   const aws = AWS;
//   aws.config.update({ region: 'ap-southeast-1' });
//   aws.config.credentials = {
//     accessKeyId: 'AKIAIELSN7ONHHRADEHQ',
//     secretAccessKey: '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',
//     region: 'ap-southeast-1',
//   };
//   const s3 = new aws.S3({ apiVersion: '2006-03-01' });
//
//   const thisConfig = {
//     AllowedHeaders: ['*'],
//     AllowedMethods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
//     AllowedOrigins: ['*'],
//     ExposeHeaders: [],
//     MaxAgeSeconds: 3000,
//   };
//   const corsRules = new Array(thisConfig);
//   const corsParams = { Bucket: 'dump.groundtruth.konigle.com', CORSConfiguration: { CORSRules: corsRules } };
//
//   s3.putBucketCors(corsParams, (err, data) => {
//     if (err) {
//       // display error message
//       console.log('Error', err);
//     } else {
//       // update the displayed CORS config for the selected bucket
//       console.log('Success', data);
//     }
//   });
// };
//
// export {
//   invoice,
// };
