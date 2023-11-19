package com.lostandfound.LostAndFound.core.utils;

import com.lostandfound.LostAndFound.core.bo.FilterOptions;
import com.lostandfound.LostAndFound.core.bo.LafLocation;
import com.lostandfound.LostAndFound.core.exception.LostAndFoundException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.regex.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

@Getter
@Setter
public class SearchFilter {
  private static final double EARTH_RADIUS_METERS = 6371000.0;
  private final Map<String, BiConsumer<Criteria, Object>> MODE_HANDLERS = new HashMap<>();
  private HashMap<String, FilterOptions> filters = new HashMap<>();
  private int page;
  private int size;
  private String sortField;
  private Sort.Direction sortDirection;

  {
    MODE_HANDLERS.put("in", SearchFilter::addInCriteria);
    MODE_HANDLERS.put("contains", SearchFilter::addContainsCriteria);
    MODE_HANDLERS.put("is", SearchFilter::addEqualsCriteria);
    MODE_HANDLERS.put("equals", SearchFilter::addEqualsCriteria);
    MODE_HANDLERS.put("gt", SearchFilter::addGtCriteria);
    MODE_HANDLERS.put("lt", SearchFilter::addLtCriteria);
    MODE_HANDLERS.put("gte", SearchFilter::addGteCriteria);
    MODE_HANDLERS.put("lte", SearchFilter::addLteCriteria);
    MODE_HANDLERS.put("geo", SearchFilter::addGeoCriteria);
  }

  private static void handleInvalidFilter(Criteria criteria, Object o) {
    // add logging in future.
    throw new LostAndFoundException("Invalid filter.");
  }

  private static void addInCriteria(Criteria criteria, Object value) {
    if (value instanceof Collection<?>) {
      criteria.in(value);
    }
  }

  private static void addContainsCriteria(Criteria criteria, Object value) {
    Criteria titleCriteria = Criteria.where("title").regex(Pattern.quote((String) value), "i");
    Criteria descriptionCriteria =
        Criteria.where("description").regex(Pattern.quote((String) value), "i");
    criteria.orOperator(titleCriteria, descriptionCriteria);
  }

  private static void addEqualsCriteria(Criteria criteria, Object value) {
    criteria.is(value);
  }

  private static void addGtCriteria(Criteria criteria, Object value) {

    criteria.gt(value);
  }

  private static void addLtCriteria(Criteria criteria, Object value) {

    criteria.lt(value);
  }

  private static void addGteCriteria(Criteria criteria, Object value) {
    if (value instanceof Number) {
      criteria.gte(value);
    } else if (value instanceof Date) {
      criteria.gte(value);
    }
  }

  private static void addLteCriteria(Criteria criteria, Object value) {

    criteria.lte(value);
  }

  private static void addGeoCriteria(Criteria criteria, Object value) {
    if (value instanceof LafLocation) {
      LafLocation location = (LafLocation) value;
      Double longitude = location.getX();
      Double latitude = location.getY();
      Double radius = location.getRadius() / EARTH_RADIUS_METERS;
      criteria =
          new Criteria("location").nearSphere(new Point(longitude, latitude)).maxDistance(radius);
    }
  }

  public Query buildQuery(SearchFilter filter) {
    Query query = new Query();

    for (Map.Entry<String, FilterOptions> filters : filter.getFilters().entrySet()) {
      Criteria criteria = buildCriteria(filters);
      query.addCriteria(criteria);
    }

    applySort(filter, query);

    return query;
  }

  private Criteria buildCriteria(Map.Entry<String, FilterOptions> filters) {
    Criteria criteria = new Criteria();
    String key = filters.getKey();
    FilterOptions filterOptions = filters.getValue();
    Object value = filterOptions.getValue();
    String mode = filterOptions.getMode();

    criteria = criteria.where(key);

    MODE_HANDLERS.getOrDefault(mode, SearchFilter::handleInvalidFilter).accept(criteria, value);

    return criteria;
  }

  private void applySort(SearchFilter searchFilter, Query query) {
    if (searchFilter.getSortField() != null) {
      query.with(Sort.by(searchFilter.getSortDirection(), searchFilter.getSortField()));
    }
  }
}
