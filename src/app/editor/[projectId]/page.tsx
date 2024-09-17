import { protectServer } from '@/features/auth/utils';

import { Editor } from '@/features/editor/components/editor';
import React from 'react';

async function EditorProjectIdPage() {
	await protectServer();
	return <Editor />; //editor with respect to the project id
}

export default EditorProjectIdPage;
