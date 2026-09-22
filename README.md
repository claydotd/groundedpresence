# Grounded Presence
Currently live at: [https://analoguegonedigital.co.uk/groundedpresence/](https://analoguegonedigital.co.uk/groundedpresence/)

## Editing pages
To edit the text on each page, you will find the files in the [/content folder](/content/)
Edit the file, then press the Commit Changes button. It will take a few minutes for the changes to go live.

All text is in Markdown format. I've put the cheat sheet below, but you can also find it on [MarkdownGuide.org](https://www.markdownguide.org/cheat-sheet/)

You can upload any images you want to put on the pages to the [public/images folder](/public/images/) then add them to the pages using the path `/images/filename`. So for example, if I want to use your footprints image (since it's already uploaded there), I would put `/images/footprints.avif` as the image source.

## Adding photos and collections
You can add new collection by adding a new folder to `/public/galleries/` and putting images in it. The Work page will automatically 
The order that they appear in is set by the numbers, so please keep the same convention of `number`**-**`name` for the collections.

The photo order in each collection is also set by alphanumeric order, you can see (at the time of writing this) that I've ordered the Street and Stage collections by naming the files.

## Adding new pages
You can add new pages to the website by creating a new `.md` file in the [/content folder](/content/)
The file name will be the page's title on the website (without the .md at the end of course)

## If you need any help
I'm always more than happy to help make any changes or quick fixes- just email me and I'll sort it :)
[hello@analoguegonedigital.co.uk](mailto:hello@analoguegonedigital.co.uk)

# Markdown Cheat Sheet

This Markdown Cheat Sheet is from [The Markdown Guide](https://www.markdownguide.org)!

This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax/) and [extended syntax](https://www.markdownguide.org/extended-syntax/).

## Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

### Heading

# H1
## H2
### H3

### Bold

**bold text**

### Italic

*italicized text*

### Blockquote

> blockquote

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- First item
- Second item
- Third item

### Code

`code`

### Horizontal Rule

---

### Link

[Markdown Guide](https://www.markdownguide.org)

### Image

![alt text](https://www.markdownguide.org/assets/images/tux.png)

## Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

### Table

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

### Fenced Code Block

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

### Footnote

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

### Heading ID

### My Great Heading {#custom-id}

### Definition List

term
: definition

### Strikethrough

~~The world is flat.~~

### Task List

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

### Emoji

That is so funny! :joy:

(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))

### Highlight

I need to highlight these ==very important words==.

### Subscript

H~2~O

### Superscript

X^2^