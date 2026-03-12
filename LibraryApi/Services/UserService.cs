using LibraryApi.DTOs;
using LibraryApi.Models;
using LibraryApi.Repositories;

namespace LibraryApi.Services
{
    public class UserService
    {
        private readonly UserRepository _repository;
        public UserService(UserRepository repository)
        {
            _repository = repository;
        }

        public async Task<User?> LoginAsync(string email, string password)
        {
            return await _repository.GetUserByEmailAndPasswordAsync(email, password);
        }
    }
}