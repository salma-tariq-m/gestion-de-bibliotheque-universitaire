using LibraryApi.Models;
using LibraryApi.Repositories;
using LibraryApi.DTOs;

namespace LibraryApi.Services
{
    public class BookService
    {
        private readonly BookRepository _repository;

        public BookService(BookRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Book>> GetBooks()
        {
            return await _repository.GetAllBooksAsync();
        }

        public async Task CreateBook(BookDto dto)
        {
            var book = new Book
            {
                Title = dto.Title,
                Author = dto.Author
            };

            await _repository.AddBookAsync(book);
        }
    }
}
