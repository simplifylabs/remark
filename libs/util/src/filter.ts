interface IFilterError {
  error: true;
  original: undefined;
  url: undefined;
  share: undefined;
}

interface IFilterResult {
  error: false;
  original: string;
  url: string;
  share: string;
}

const allowedQueries: string[] = ["q", "query", "search", "s", "v"];

export default function filter(str: string): IFilterResult | IFilterError {
  try {
    const url = new URL(str);
    url.hash = "";

    let domain = url.hostname;
    domain = domain.replace("www.", "");

    let filteredSearch = "";
    let shareSearch = "";

    if (url.search) {
      const search = filterSearch(url.searchParams);

      const searchStr = search.toString();
      if (searchStr) filteredSearch = `?${searchStr}`;

      search.append("remark", "%REMARK_ID%");
      shareSearch = `?${search.toString()}`;
    } else {
      shareSearch = "?remark=%25REMARK_ID%25";
    }

    const filtered = `${domain}${url.pathname}${filteredSearch}`;
    const share = `${url.toString().split("?")[0]}${shareSearch}`;

    return { error: false, original: str, url: filtered, share: share };
  } catch (e) {
    return {
      error: true,
      original: undefined,
      url: undefined,
      share: undefined,
    };
  }
}

function filterSearch(input: URLSearchParams) {
  const result: URLSearchParams = new URLSearchParams();

  input.forEach((value, key) => {
    if (allowedQueries.includes(key)) result.append(key, value);
  });

  return result;
}
