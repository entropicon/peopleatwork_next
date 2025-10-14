"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import ClearIcon from "@mui/icons-material/Clear";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import {
	Box,
	Divider,
	FormControl,
	IconButton,
	MenuItem,
	Select,
	Stack,
	Tooltip,
	useTheme,
} from "@mui/material";

type RichEditorProps = {
	value?: string;
	defaultValue?: string;
	onChange?: (html: string) => void;
	placeholder?: string;
	editable?: boolean;
	autofocus?: boolean;
	minHeight?: number | string;
	className?: string;
};

function Tiptap({
	value,
	defaultValue,
	onChange,
	placeholder = "Write something…",
	editable = true,
	autofocus = false,
	minHeight = 160,
	className,
}: RichEditorProps) {
	const theme = useTheme();

	const lastValueRef = React.useRef<string | undefined>(value);

	const editor = useEditor(
		{
			extensions: [
				StarterKit.configure({
					bulletList: { keepMarks: true },
					orderedList: { keepMarks: true },
					codeBlock: {},
					horizontalRule: {},
				}),
				Underline,
				Link.configure({
					openOnClick: false,
					autolink: true,
					defaultProtocol: "https",
					validate: (href) =>
						/^https?:\/\//i.test(href) || href.startsWith("/"),
				}),
				Image.configure({ inline: false, allowBase64: true }),
				Placeholder.configure({ placeholder }),
				TextAlign.configure({ types: ["heading", "paragraph"] }),
			],
			content: value ?? defaultValue ?? "",
			editable,
			autofocus,
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				lastValueRef.current = html;
				onChange?.(html);
			},
			immediatelyRender: false,
		},
		[placeholder, editable, autofocus]
	);

	React.useEffect(() => {
		if (!editor) return;
		if (typeof value !== "string") return;
		const current = editor.getHTML();
		if (value !== current && value !== lastValueRef.current) {
			editor.commands.setContent(value, { emitUpdate: false });
			lastValueRef.current = value;
		}
	}, [value, editor]);

	React.useEffect(() => {
		if (!editor) return;
		editor.setEditable(editable);
	}, [editable, editor]);

	const setLink = () => {
		if (!editor) return;
		const prev = editor.getAttributes("link").href as string | undefined;
		const url = window.prompt("Enter URL", prev ?? "https://");
		if (url === null) return;
		if (url === "") {
			editor.chain().focus().unsetLink().run();
			return;
		}
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};

	const Toolbar = () => (
		<Box
			sx={{
				borderBottom: `1px solid ${theme.palette.divider}`,
				px: 1,
				py: 0.5,
				display: "flex",
				alignItems: "center",
				flexWrap: "wrap",
				gap: 0.5,
				bgcolor: "background.paper",
				position: "sticky",
				top: 0,
				zIndex: 1,
			}}
		>
			<Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap">
				<FormControl size="small" sx={{ minWidth: 110 }}>
					<Select
						labelId="heading-label"
						value={
							editor?.isActive("heading", { level: 1 })
								? 1
								: editor?.isActive("heading", { level: 2 })
								? 2
								: editor?.isActive("heading", { level: 3 })
								? 3
								: 0
						}
						onChange={(e) => {
							const level = Number(e.target.value);
							if (level === 0) editor?.chain().focus().setParagraph().run();
							else
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: level as 1 | 2 | 3 })
									.run();
						}}
					>
						<MenuItem value={0}>Paragraph</MenuItem>
						<MenuItem value={1}>Heading 1</MenuItem>
						<MenuItem value={2}>Heading 2</MenuItem>
						<MenuItem value={3}>Heading 3</MenuItem>
					</Select>
				</FormControl>
				<Tooltip title="Bold">
					<span>
						<IconButton
							size="small"
							onClick={() => editor?.chain().focus().toggleBold().run()}
							disabled={!editor?.can().chain().focus().toggleBold().run()}
							color={editor?.isActive("bold") ? "primary" : "default"}
						>
							<FormatBoldIcon fontSize="small" />
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip title="Italic">
					<span>
						<IconButton
							size="small"
							onClick={() => editor?.chain().focus().toggleItalic().run()}
							disabled={!editor?.can().chain().focus().toggleItalic().run()}
							color={editor?.isActive("italic") ? "primary" : "default"}
						>
							<FormatItalicIcon fontSize="small" />
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip title="Underline">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().toggleUnderline().run()}
						color={editor?.isActive("underline") ? "primary" : "default"}
					>
						<FormatUnderlinedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Strikethrough">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().toggleStrike().run()}
						color={editor?.isActive("strike") ? "primary" : "default"}
					>
						<StrikethroughSIcon fontSize="small" />
					</IconButton>
				</Tooltip>

				<Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

				<Tooltip title="Bullet list">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().toggleBulletList().run()}
						color={editor?.isActive("bulletList") ? "primary" : "default"}
					>
						<FormatListBulletedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Numbered list">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().toggleOrderedList().run()}
						color={editor?.isActive("orderedList") ? "primary" : "default"}
					>
						<FormatListNumberedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Blockquote">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().toggleBlockquote().run()}
						color={editor?.isActive("blockquote") ? "primary" : "default"}
					>
						<FormatQuoteIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

				<Tooltip title="Align left">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().setTextAlign("left").run()}
						color={
							editor?.isActive({ textAlign: "left" }) ? "primary" : "default"
						}
					>
						<FormatAlignLeftIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Align center">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().setTextAlign("center").run()}
						color={
							editor?.isActive({ textAlign: "center" }) ? "primary" : "default"
						}
					>
						<FormatAlignCenterIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Align right">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().setTextAlign("right").run()}
						color={
							editor?.isActive({ textAlign: "right" }) ? "primary" : "default"
						}
					>
						<FormatAlignRightIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Justify">
					<IconButton
						size="small"
						onClick={() =>
							editor?.chain().focus().setTextAlign("justify").run()
						}
						color={
							editor?.isActive({ textAlign: "justify" }) ? "primary" : "default"
						}
					>
						<FormatAlignJustifyIcon fontSize="small" />
					</IconButton>
				</Tooltip>

				<Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

				<Tooltip title="Insert link">
					<IconButton
						size="small"
						onClick={setLink}
						color={editor?.isActive("link") ? "primary" : "default"}
					>
						<LinkIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Remove link">
					<span>
						<IconButton
							size="small"
							onClick={() => editor?.chain().focus().unsetLink().run()}
							disabled={!editor?.isActive("link")}
						>
							<LinkOffIcon fontSize="small" />
						</IconButton>
					</span>
				</Tooltip>

				<Tooltip title="Horizontal rule">
					<IconButton
						size="small"
						onClick={() => editor?.chain().focus().setHorizontalRule().run()}
					>
						<HorizontalRuleIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

				<Tooltip title="Clear formatting">
					<IconButton
						size="small"
						onClick={() =>
							editor?.chain().focus().clearNodes().unsetAllMarks().run()
						}
					>
						<ClearIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			</Stack>
		</Box>
	);

	return (
		<Box
			className={className}
			sx={{
				border: `1px solid ${theme.palette.divider}`,
				borderRadius: 1.5,
				overflow: "hidden",
				bgcolor: "background.paper",
			}}
		>
			<Toolbar />
			<Box
				sx={{
					px: 1.5,
					py: 1,

					"& .ProseMirror": {
						outline: "none",
						minHeight,
						fontSize: 14,
						lineHeight: 1.7,

						"&:focus": {
							// optional focus style
						},

						// Lists spacing
						"& ul, & ol": { paddingLeft: 3, margin: 0 },
						"& li": { margin: 0.25 },

						// Headings
						"& h1": { fontSize: 24, margin: "10px 0" },
						"& h2": { fontSize: 20, margin: "8px 0" },
						"& h3": { fontSize: 18, margin: "6px 0" },

						// Blockquote
						"& blockquote": {
							borderLeft: `3px solid ${theme.palette.divider}`,
							margin: 0,
							paddingLeft: 2,
							color: theme.palette.text.secondary,
						},

						// Code
						"& code": {
							background: theme.palette.action.hover,
							borderRadius: 0.75,
							padding: "0 4px",
							fontFamily: "monospace",
							fontSize: 13,
						},
						"& pre": {
							background: theme.palette.action.hover,
							padding: 1,
							borderRadius: 1,
							overflow: "auto",
						},
						"& pre code": { background: "transparent", padding: 0 },

						// Images
						"& img": { maxWidth: "100%", height: "auto" },
					},
				}}
			>
				<EditorContent editor={editor}/>
			</Box>
		</Box>
	);
}

export default React.memo(Tiptap);
