import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const postsBase = "src/data/posts"

export const collections = {
    todos: defineCollection({
        loader: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos")
            const data = await res.json()
            return data.map((todo: any) => ({ ...todo, id: String(todo.id) }))
        },
        schema: z.object({
            title: z.string()
        })
    }),
    posts: defineCollection({
        loader: glob({
            pattern: "**/*.md",
            base: postsBase,
            generateId: ({ entry }) => entry.replace(postsBase, "").replace(".md", "")
        }),
        schema: ({ image }) => z.object({
            title: z.string(),
            tags: z.array(z.string()),
            pubDate: z.coerce.date(),
            isDraft: z.boolean(),
            canonicalURL: z.string().url().optional(),
            cover: image(),
            coverAlt: z.string(),
            author: reference("team")
        })
    }),
    team: defineCollection({
        loader: file("src/data/team.json", {
            parser: (text) => JSON.parse(text)['team1'],
        }),
        schema: z.object({
            name: z.string(),
            role: z.string(),
            email: z.string().email(),
            todos: z.array(reference("todos")),
            department: z.enum([
                "Engineering",
                "Software Development",
                "Product Design"
            ])
        })
    })
}