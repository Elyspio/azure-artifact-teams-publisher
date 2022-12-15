import { SvgIconProps } from "@mui/material/SvgIcon";
import { SvgIcon } from "@mui/material";
import React from "react";

import { ReactComponent as NpmIcon } from "./npm.svg";
import { ReactComponent as NugetIcon } from "./nuget.svg";
import { ReactComponent as ArtifactIcon } from "./artifact.svg";
import { ReactComponent as ProjectIcon } from "./project.svg";
import { ReactComponent as RepositoryIcon } from "./repository.svg";

export const NugetIconComponent = (props: SvgIconProps) => <SvgIcon component={NugetIcon} sx={{ width: 24, height: 24 }} inheritViewBox {...props} />;
export const NpmIconComponent = (props: SvgIconProps) => <SvgIcon component={NpmIcon} sx={{ width: 24, height: 24 }} inheritViewBox {...props} />;
export const ArtifactIconComponent = (props: SvgIconProps) => <SvgIcon component={ArtifactIcon} sx={{ width: 20, height: 20 }} inheritViewBox {...props} />;
export const ProjectIconComponent = (props: SvgIconProps) => <SvgIcon component={ProjectIcon} sx={{ width: 20, height: 20 }} inheritViewBox {...props} />;
export const RepositoryIconComponent = (props: SvgIconProps) => <SvgIcon component={RepositoryIcon} inheritViewBox {...props} />;
