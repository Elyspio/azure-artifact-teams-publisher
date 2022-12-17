using AzureArtifact.Api.Abstractions.Transports.User;

namespace AzureArtifact.Api.Adapters.Adapters.Teams;

internal class TeamsMessageBuilder
{
	private readonly List<string> _actions = new();
	private readonly List<string> _body = new();
	private readonly HashSet<Mention> _mentions = new();

	public TeamsMessageBuilder AddText(string content, TextBlockSize size = TextBlockSize.Default, TextBlockWeight weight = TextBlockWeight.Default, bool isSubtle = false)
	{
		_body.Add($$"""
			{
				"type": "TextBlock",
				"text": "{{content}}",
				"size": "{{size.ToString().ToLower()}}",
				"weight": "{{weight.ToString().ToLower()}}",
				"isSubtle": {{isSubtle.ToString().ToLower()}}
			}
		"""
		);
		return this;
	}


	public TeamsMessageBuilder AddDictionary(Dictionary<string, string> dictionary)
	{
		_body.Add($$"""
				{
		      "type": "FactSet",
		      "facts": [
				{{string.Join(',', dictionary.Select(Stringify))}}
		      ]
		    }		
		""");

		return this;
	}

	public TeamsMessageBuilder AddOpenLinkAction(string label, string link)
	{
		_actions.Add($$"""
			{
		      "type": "Action.OpenUrl",
		      "title": "{{label}}",
		      "url": "{{link}}"
			}
		""");

		return this;
	}


	public string Stringify(UserData user)
	{
		_mentions.Add(new()
		{
			Id = user.Id,
			Mail = user.Mail,
			Name = user.Name
		});
		return $"<at>{user.Mail}</at>";
	}

	private string Stringify(KeyValuePair<string, string> pair)
	{
		return $$"""
		{
			"title": "{{pair.Key}}",
			"value": "{{pair.Value}}"
		}		
		""";
	}


	public string Build()
	{
		return $$"""
			{
				"type": "message",
				"attachments": [
					{
						"contentType": "application/vnd.microsoft.card.adaptive",
						"content": {
							"type": "AdaptiveCard",
							"body": [
								{{string.Join(',', _body)}}
							],
							"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
							"version": "1.0",
							"msteams": {
								"entities": [
									{{string.Join(',', _mentions)}}
								]
							},
							"actions": [
								{{string.Join(',', _actions)}}
							]
						}
					}
				]
			}
		""";
	}
}

public class Mention
{
	public required string Name { get; init; }
	public required string Id { get; init; }
	public required string Mail { get; init; }

	private bool Equals(Mention other)
	{
		return Id == other.Id;
	}

	public override bool Equals(object? obj)
	{
		if (ReferenceEquals(null, obj)) return false;
		if (ReferenceEquals(this, obj)) return true;
		return obj.GetType() == GetType() && Equals((Mention) obj);
	}

	public override int GetHashCode()
	{
		return Id.GetHashCode();
	}

	public override string ToString()
	{
		return $$"""
			{
				"type": "mention",
				"text": "<at>{{Mail}}</at>",
				"mentioned": {
					"id": "{{Mail}}",
					"name": "{{Name}}"
				}
			}
		""";
	}
}

internal enum TextBlockSize
{
	Default,
	Small,
	Medium,
	Larger,
	Large,
	ExtraLarge
}

internal enum TextBlockWeight
{
	Default,
	Lighter,
	Bolder
}