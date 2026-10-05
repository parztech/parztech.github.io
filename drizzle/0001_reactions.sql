CREATE TABLE `reactions` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`visitor_hash` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reactions_post_visitor_type_unique` ON `reactions` (`post_id`,`visitor_hash`,`type`);--> statement-breakpoint
CREATE INDEX `reactions_post_idx` ON `reactions` (`post_id`);