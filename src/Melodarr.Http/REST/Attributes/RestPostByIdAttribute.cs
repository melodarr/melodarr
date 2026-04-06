using System;
using Microsoft.AspNetCore.Mvc;

namespace Melodarr.Http.REST.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class RestPostByIdAttribute : HttpPostAttribute
    {
    }
}
