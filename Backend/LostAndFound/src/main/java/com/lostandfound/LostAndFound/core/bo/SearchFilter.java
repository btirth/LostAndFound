package com.lostandfound.LostAndFound.core.bo;

import java.util.HashMap;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class SearchFilter {
  private HashMap<String, FilterOptions> filters = new HashMap<>();
  private int page;
  private int size;
  private String sortField;
  private Sort.Direction sortDirection;
}
