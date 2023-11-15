package com.lostandfound.LostAndFound.core.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lostandfound.LostAndFound.core.bo.FilterOptions;
import com.lostandfound.LostAndFound.core.bo.LafLocation;
import com.lostandfound.LostAndFound.core.bo.SearchFilter;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.regex.Pattern;
import org.springframework.data.domain.Sort;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class BuildQuery {
  public static Query buildQuery(SearchFilter searchFilter) {
    Query query = new Query();

    for (Map.Entry<String, FilterOptions> filters : searchFilter.getFilters().entrySet()) {
      Criteria criteria = new Criteria();
      String key = filters.getKey();
      FilterOptions filterOptions = filters.getValue();
      Object value = filterOptions.getValue();
      String mode = filterOptions.getMode();
      criteria = criteria.where(key);
      switch (mode) {
        case "in":
          if (value instanceof Collection<?>) {
            criteria.in((Collection<?>) value);
          }
          break;
        case "contains":
          if (value instanceof String) {
            if (key.equals("keyword")) {
              criteria =
                  new Criteria()
                      .orOperator(
                          Criteria.where("title").regex(Pattern.quote((String) value), "i"),
                          Criteria.where("description").regex(Pattern.quote((String) value), "i"));
            } else {
              criteria.regex(Pattern.quote((String) value), "i");
            }
          }
          break;
        case "is":
        case "equals":
          if (value instanceof Number) {
            criteria.is((Number) value);
          } else if (value instanceof Date) {
            criteria.is((Date) value);
          } else if (value instanceof String) {
            criteria.is((String) value);
          } else if (value instanceof Boolean) {
            criteria.is((Boolean) value);
          }
          break;
        case "gt":
          if (value instanceof Number) {
            criteria.gt((Number) value);
          } else if (value instanceof Date) {
            criteria.gt((Date) value);
          }
          break;
        case "lt":
          if (value instanceof Number) {
            criteria.lt((Number) value);
          } else if (value instanceof Date) {
            criteria.lt((Date) value);
          }
          break;
        case "gte":
          if (value instanceof Number) {
            criteria.gte((Number) value);
          } else if (value instanceof Date) {
            criteria.gte((Date) value);
          }
          break;
        case "lte":
          if (value instanceof Number) {
            criteria.lte((Number) value);
          } else if (value instanceof Date) {
            criteria.lte((Date) value);
          }
          break;
        case "geo":
          ObjectMapper objectMapper = new ObjectMapper();
          LafLocation location = objectMapper.convertValue(value, LafLocation.class);
          criteria =
              new Criteria("location")
                  .nearSphere(new Point(location.getX(), location.getY()))
                  .maxDistance(location.getRadius() / 6371000);
          break;
        default:
          break;
      }

      query.addCriteria(criteria);
    }

    if (searchFilter.getSortField() != null) {
      query.with(Sort.by(searchFilter.getSortDirection(), searchFilter.getSortField()));
    }

    return query;
  }
}
