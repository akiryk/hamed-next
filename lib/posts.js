import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Newsletter from '@/app/components/Newsletter';
// Rehype plugins
import rehypePrettyCode from 'rehype-pretty-code';
import { root } from 'postcss';

const prettyCodeOptions = {
  theme: 'github-dark-dimmed',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['highlighted', 'word'];
  }
};
const rootDirectory = path.join(process.cwd(), 'content');

// Custom components
const components = {
  h1: props => (
    <h1 {...props} className='text-emerald-400'>
      {props.children}
    </h1>
  ),
  Newsletter: Newsletter
};

export const getPostBySlug = async slug => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
      }
    }
  });

  return { content, frontmatter, slug: realSlug };
};

export const getAllPosts = async () => {
  const files = fs.readdirSync(rootDirectory);
  const posts = [];
  for (const file of files) {
    const post = await getPostBySlug(file);
    posts.push(post);
  }

  return posts;
};

export const wait = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
