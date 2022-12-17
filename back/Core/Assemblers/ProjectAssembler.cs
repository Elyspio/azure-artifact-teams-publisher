using AzureArtifact.Api.Abstractions.Common.Assemblers;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Project;

namespace AzureArtifact.Api.Core.Assemblers;

public class ProjectAssembler : BaseAssembler<Project, ProjectEntity>
{
	public override Project Convert(ProjectEntity obj)
	{
		return new()
		{
			Organisation = obj.Organisation,
			Name = obj.Name,
			IdAzure = obj.IdAzure,
			Repositories = obj.Repositories
		};
	}

	public override ProjectEntity Convert(Project obj)
	{
		throw new NotImplementedException();
	}
}