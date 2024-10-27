import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import CloudinaryImage from "./CloudinaryImage";

export interface ProjectCardProps extends React.ComponentProps<typeof Card> {
  name: string | React.ReactNode;
  description: string | React.ReactNode;
  category: string | React.ReactNode;
  publicCloudinaryImageId: string;
}

const ProjectCard = React.forwardRef<typeof Card, ProjectCardProps>(
  (
    { name, category, description, publicCloudinaryImageId, ...props },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    return (
      <Card {...props}>
        <CloudinaryImage
          className="pt-4 flex justify-center items-center"
          imageStyle={{ width: "auto", height: "300px" }}
          publicImageId={publicCloudinaryImageId}
        />
        <CardHeader className="mt-8 flex flex-col justify-center items-center">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{category}</CardDescription>
        </CardHeader>
        <CardContent>{description}</CardContent>
      </Card>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
