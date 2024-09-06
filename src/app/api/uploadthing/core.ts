import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// TODO Replace with NEXTAUTH
	imageUploader: f({ image: { maxFileSize: '4MB' } })
		.middleware(async ({ req }) => {
			const user = await auth(req);

			if (!user) throw new UploadThingError('Unauthorized');

			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);

			console.log('file url', file.url);

			// Store file in db with metadata.userId

			return { url: file.url };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
