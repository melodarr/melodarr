using System;

namespace Melodarr.Http.Exceptions
{
    public class InvalidApiKeyException : Exception
    {
        public InvalidApiKeyException()
        {
        }

        public InvalidApiKeyException(string message)
            : base(message)
        {
        }
    }
}
