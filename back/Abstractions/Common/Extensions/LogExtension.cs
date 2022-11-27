using Microsoft.Extensions.Logging;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace AzureArtifact.Api.Abstractions.Common.Extensions;

public static class Log
{
	private static readonly JsonSerializerOptions options = new()
	{
		Converters =
		{
			new JsonStringEnumConverter()
		}
	};

	public static string Format(object? value, [CallerArgumentExpression("value")] string name = "")
	{
		return $"{name}={JsonSerializer.Serialize(value, options)}";
	}


	public static LoggerInstance<T> Enter<T>(this ILogger<T> logger, string arguments = "", LogLevel level = LogLevel.Debug, [CallerMemberName] string method = "")
	{
		var loggerInstance = new LoggerInstance<T>(logger, method, arguments, level);

		loggerInstance.Enter();

		return loggerInstance;
	}


	public class LoggerInstance<T>
	{
		private readonly string arguments;
		private readonly LogLevel level;
		private readonly ILogger<T> logger;
		private readonly string method;

		public LoggerInstance(ILogger<T> logger, string method, string arguments, LogLevel level)
		{
			this.arguments = arguments;
			this.level = level;
			this.method = method;
			this.logger = logger;
		}

		public void Error(string content)
		{
			var sb = new StringBuilder($"Erreur méthode {method} : {content}");
			logger.LogError(sb.ToString());
		}

		public void Enter()
		{
			if (!logger.IsEnabled(level)) return;
			var sb = new StringBuilder($"Entrée méthode {method}");
			if (arguments?.Length > 0) sb.Append($": {arguments}");

			logger.Log(level, sb.ToString());
		}


		public void Exit()
		{
			if (!logger.IsEnabled(level)) return;
			var sb = new StringBuilder($"Sortie méthode {method}");
			if (arguments?.Length > 0) sb.Append($": {arguments}");

			logger.Log(level, sb.ToString());
			logger.Log(level, arguments);
		}
	}
}