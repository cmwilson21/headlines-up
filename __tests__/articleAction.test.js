import { loadArticle } from "../src/actions/articleAction";

describe('loadArticle', () => {
  it ('dispatches the correct actions on successful fetch request', async () => {
    const mockDispatch = jest.fn();
    const mockArticles = [{id: 1, title: 'Test Article'}];

    global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () Promise.resolve({articles: mockArticles}),
      }))
      await loadArticle()(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({type: 'REQUESTING'});
      expect(mockDispatch).toHaveBeenCalledWith({type: 'GET_ARTICLES', payload: mockArticles});
      expect(mockDispatch).toHaveBeenCalledWith({type: 'COMPLETED_REQUESTING'});
  })
})